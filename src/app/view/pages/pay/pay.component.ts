import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../../../models/UserModel";
import {ComicOrderModel} from "../../../models/ComicOrderModel";
import {UserOrderModel} from "../../../models/UserOrderModel";
import {AuthService} from "../../../core/service/auth.service";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {ComicOrderService} from "../../../core/service/comic-order.service";
import {UserOrderService} from "../../../core/service/user-order.service";
import {ToastrService} from "ngx-toastr";
import {AuthModel} from "../../../models/AuthModel";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent implements OnInit{

  user: UserModel = new UserModel();
  comicOrders: ComicOrderModel[] | undefined;
  userOrder: UserOrderModel = new UserOrderModel();
  totalPrice: number = 0;
  totalProduct: number = 0;
  URL_FILE: string = `${environment.FILE_COMIC_URL}`;

  constructor(
      private router: Router,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
      private comicOrderService: ComicOrderService,
      private userOrderService: UserOrderService,
      private toaStr: ToastrService
  ) {
  }

  ngOnInit() {
    this.user.username = this.authService.getCurrentUserUsername();
    this.getUserInfo();
    this.getListComicOrder();
  }

  //  lấy thông tin người dùng
  getUserInfo(): void {
    this.user.username = this.authService.getCurrentUserUsername();
    this.authService.getInfoUser(this.user).subscribe((res: ResponseModel<UserModel>): void => {
      if (res.data !== null) {
        this.user = res.data;
        this.userOrder.userId = res.data.id;
      }
      this.cdr.detectChanges();
    })
  }

  //  lấy danh sách id của từng hàng trong giỏ hàng
  getListIdUserModel() {
    if (this.comicOrders) {
      for (const comicOrder of this.comicOrders) {
        if (comicOrder.comicOrderId !== null) {
          this.userOrder.comicOrders?.push(...this.userOrder.comicOrders, comicOrder.comicOrderId);
        }
      }
    }
  }

  // lấy danh sách hàng trong giở hàng
  getListComicOrder() {
    this.comicOrderService.getComicOrders(this.user).subscribe((res: ComicOrderModel[]) => {
      this.comicOrders = res;
      this.getListIdUserModel();
      this.getTotalPriceAndTotalProduct();
      this.cdr.detectChanges();
    })
  }

  //  lấy tổng giá và tổng sản phẩm của các hàng trong giỏ hàng
  getTotalPriceAndTotalProduct(): void {
    if (this.comicOrders) {
      for (const comicOrder of this.comicOrders) {
        this.totalProduct += comicOrder.quantity;
        this.totalPrice += comicOrder.totalPrice * comicOrder.quantity;
      }
      this.userOrder.totalPrice = this.totalPrice;
    }
    this.cdr.detectChanges();
  }

  order() {
    if (this.validateUser()) {
      this.userOrder.status = 0;
      this.userOrderService.order(this.userOrder).subscribe((res: ResponseModel<String>) => {
        if (res.status === "OK") {
          this.toaStr.success(res.message);
          this.router.navigate(["/home"]);
        }
      })
    } else {
      this.toaStr.warning("Bạn cần điền đầy đủ thông tin để thực hiện thanh toán!")
      this.router.navigate(["/user"]);
    }
  }

  validateUser(): boolean {
    if (this.user.fullName === null || this.user.fullName.trim() === '') {
      return false;
    }
    if (this.user.address === null || this.user.address.trim() === '') {
      return false;
    }
    if (this.user.phone === null || this.user.phone.trim() === '') {
      return false;
    }
    return true;
  }
}
