import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../models/UserModel";
import {AuthService} from "../../../core/service/auth.service";
import {ComicOrderService} from "../../../core/service/comic-order.service";
import {ComicOrderModel} from "../../../models/ComicOrderModel";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {WishlistModel} from "../../../models/WishlistModel";
import {WishlistService} from "../../../core/service/wishlist.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

    user: UserModel = new UserModel();
    comicOrders: ComicOrderModel[] = [];
    totalPrice: number = 0;
    totalProduct: number = 0;
    comicOrderDelete: ComicOrderModel = new ComicOrderModel();
    @ViewChild("deletePopup") deletePopup !: TemplateRef<any>;
    deleteTemplatePopup: MatDialogRef<TemplateRef<any>> | undefined;
    wishModel: WishlistModel = new WishlistModel();
    listPath: string[] = [];
    URL_FILE: string = `${environment.FILE_COMIC_URL}`;

    constructor(
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private authService: AuthService,
        private comicOrderService: ComicOrderService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private toaStr: ToastrService,
        private wishlistService: WishlistService
    ) {
        this.listPath = ["Trang chủ", "Giỏ hàng"]
    }

    ngOnInit() {
        const decodeToken = this.authService.decodeToken()
        this.user.username = decodeToken?.sub;
        this.getUserInfo();
        this.getListComicOrder();
    }

    gotoPay() {
        this.router.navigate(["/pay"]);
    }

    getUserInfo() {
        this.authService.getInfoUser(this.user).subscribe((res: ResponseModel<UserModel>) => {
            if (res.status === "OK") {
                if (res.data !== null) {
                    this.user = res.data;
                }
            }
        })
    }

    getListComicOrder() {
        this.comicOrderService
            .getComicOrders(this.user)
            .subscribe((res: ComicOrderModel[]) => {
            this.comicOrders = res;
            this.getTotalPriceAndTotalProduct();
            this.cdr.detectChanges();
        })
    }

    getTotalPriceAndTotalProduct(): void {
        if (this.comicOrders) {
            for (const comicOrder of this.comicOrders) {
                this.totalProduct += comicOrder.quantity;
                this.totalPrice += comicOrder.totalPrice * comicOrder.quantity;
            }
        }
        this.cdr.detectChanges();
    }

    goToDetail(id: number | null): void {
        this.router.navigate(["/more-products/detail/" + id], {
            queryParams: {
                id
            }
        });
    }

    openDeletePopup(comicOrderId: number | null) {
        if (comicOrderId !== null) {
            this.comicOrderDelete.comicOrderId = comicOrderId;
            this.deleteTemplatePopup = this.dialog.open(this.deletePopup, {
                width: "400px",
                height: "208px"
            })
        }
    }

    closeDialog() {
        this.dialog.closeAll();
    }

    // xóa sản phẩm trong giỏ hàng
    delete() {
        this.comicOrderService
            .deleteComicOrder(this.comicOrderDelete)
            .subscribe((res: ResponseModel<String>) => {
            if (res.status === "OK") {
                this.toaStr.success(res.message);
                this.dialog.closeAll();
                this.comicOrderDelete.comicOrderId = null;
                this.totalProduct = 0;
                this.totalPrice = 0;
                this.getListComicOrder();
            } else {
                this.toaStr.error(res.message);
            }
        })
    }

    addToWishList(comicId: number | null): void {
        this.wishModel.comicId = comicId;
        this.wishModel.createdBy = this.user.id;
        this.wishlistService
            .addToWishlist(this.wishModel)
            .subscribe((res: ResponseModel<String>) => {

            if (res.status === "OK") {
                this.toaStr.success(res.message);
            } else {
                this.toaStr.error(res.message);
            }
        })
    }

    gotoDetailInfoOrder() {
        this.router.navigate(["/user-shop"])
    }
}
