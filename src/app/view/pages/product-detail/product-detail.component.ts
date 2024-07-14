import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {ComicService} from "../../../core/service/comic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ComicDetailModel} from "../../../models/ComicDetailModel";
import {calculatePrice} from "../../../helpers/constants";
import {ComicOrderModel} from "../../../models/ComicOrderModel";
import {UserModel} from "../../../models/UserModel";
import {AuthService} from "../../../core/service/auth.service";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {ComicOrderService} from "../../../core/service/comic-order.service";
import {ToastrService} from "ngx-toastr";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {faTruck} from "@fortawesome/free-solid-svg-icons/faTruck";
import {CommentModel} from "../../../models/CommentModel";
import {CommentService} from "../../../core/service/comment.service";
import {WishlistService} from "../../../core/service/wishlist.service";
import {WishlistModel} from "../../../models/WishlistModel";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
    faHeart: IconDefinition = faHeart;
    faCartShopping: IconDefinition = faCartShopping;
    faTruck: IconDefinition = faTruck;
    idComic: number | undefined;
    comicDetail: ComicDetailModel = new ComicDetailModel();
    comicOrder: ComicOrderModel = new ComicOrderModel();
    quantity: number = 1;
    protected readonly calculatePrice = calculatePrice;
    user: UserModel = new UserModel();
    comment: CommentModel = new CommentModel();
    wishModel: WishlistModel = new WishlistModel();
    listPath: string[] = [];
    LINK_IMAGE: string = `${environment.FILE_COMIC_URL}`
    LINK_AVATAR: string = `${environment.FILE_AVATAR_URL}`

    constructor(
        private comicService: ComicService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private comicOrderService: ComicOrderService,
        private toaStr: ToastrService,
        private commentService: CommentService,
        private wishlistService: WishlistService
    ) {
        this.activatedRoute.queryParams.subscribe((param: Params) => {
            this.idComic = param["id"];
        })
    }

    ngOnInit(): void {
        this.getDetailComic();
        this.getUserInfo();
        this.listPath = [...this.listPath, "Trang chủ", "Các sản phẩm"];
    }


    getDetailComic(): void {
        if (this.idComic) {
            this.comicService.getDetailComic(this.idComic).subscribe((res: ComicDetailModel): void => {
                this.comicDetail = res;
                if (this.comicDetail.comicName !== null) {
                    this.listPath = [...this.listPath, this.comicDetail.comicName]
                }
                this.cdr.detectChanges();
            })
        }
    }

    increase(): void {
        if (this.quantity < this.comicDetail.residualQuantity) {
            this.quantity++;
        }
    }

    decrease(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    validQuantity(quantity: number) {
        if (quantity > this.comicDetail.residualQuantity) {
            this.quantity = this.comicDetail.residualQuantity;
        }
    }

    getUserInfo() {
        this.user.username = this.authService.getCurrentUserUsername();
        this.authService.getInfoUser(this.user).subscribe((res: ResponseModel<UserModel>) => {
            if (res.status === "OK") {
                if (res.data !== null) {
                    this.user = res.data;
                    this.cdr.detectChanges();
                }
            }
        })
    }

    // Thêm hàng vào giỏ hàng
    addToCart(comicDetail: ComicDetailModel, buyNow: boolean): void {
        this.comicOrder.quantity = this.quantity;
        this.comicOrder.comicId = comicDetail.id;
        const actualPrice = this.calculatePrice(comicDetail.price, comicDetail.sale);
        if (actualPrice !== null) {
            this.comicOrder.totalPrice = actualPrice * this.quantity;
        }
        this.comicOrder.userId = this.user.id;
        this.comicOrderService.createComicOrder(this.comicOrder).subscribe((res: ResponseModel<String>) => {
            if (res.status === "OK" && !buyNow) {
                this.toaStr.success(res.message);
                this.quantity = 1;
                this.cdr.detectChanges();
            } else {
                this.router.navigate(["/pay"]);
            }
        })
    }

    gotoPay() {
        this.addToCart(this.comicDetail, true);
    }

    createComment() {
        this.comment.comicId = this.comicDetail.id;
        this.comment.userId = this.user.id;
        this.commentService.createComment(this.comment).subscribe((res: ResponseModel<String>) => {
            if (res.status === "OK") {
                this.toaStr.success(res.message);
                this.comment = new CommentModel();
            } else {
                this.toaStr.error(res.message);
            }
        })
    }

    addToWishlist() {
        this.wishModel.comicId = this.comicDetail.id;
        this.wishModel.createdBy = this.user.id;
        this.wishlistService.addToWishlist(this.wishModel).subscribe((res: ResponseModel<String>) => {
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

  routerCart(): void {
    this.router.navigate(["/cart"]);
  }
}
