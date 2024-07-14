import {ChangeDetectorRef, Component} from '@angular/core';
import {PurchaseOrderModel} from "../../../models/PurchaseOrderModel";
import {Page} from "../../../models/Page";
import {MatDialog} from "@angular/material/dialog";
import {UserOrderService} from "../../../core/service/user-order.service";
import {UserShopPopupComponent} from "./user-shop-popup/user-shop-popup.component";
import {AuthService} from "../../../core/service/auth.service";
import {UserModel} from "../../../models/UserModel";

@Component({
  selector: 'app-user-shop',
  templateUrl: './user-shop.component.html',
  styleUrl: './user-shop.component.scss'
})
export class UserShopComponent {
  purchaseOrder: PurchaseOrderModel = new PurchaseOrderModel();
  purchasePage: Page<PurchaseOrderModel> = new Page<PurchaseOrderModel>();
  currentPage: number = 0;
  numberPurchase: number = 0;
  pageSize: number = 0;

  constructor(
      public dialog: MatDialog,
      private userOrderService: UserOrderService,
      private cdr: ChangeDetectorRef,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.purchaseOrder.pageSize = 10;
    this.pageSize = 10;
    this.purchaseOrder.username = this.authService.getCurrentUserUsername();
    this.searchOrder(0);
  }

  getPurchaseOrderPage(purchaseOrder: PurchaseOrderModel) {
    this.userOrderService
        .getPurchaseOrderUserPage(purchaseOrder)
        .subscribe((res: Page<PurchaseOrderModel>) => {
      this.purchasePage = res;
      if (res.content) {
        this.numberPurchase = res.content.length;
      }
      this.cdr.detectChanges();
    })
  }

  openDialogShop(purchase: PurchaseOrderModel): void {
    const dialogRef = this.dialog.open(UserShopPopupComponent, {
      width: '500px',
      height: '180px',
      data: {
        userOrderId: purchase.userOrderId,
        status: purchase.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.searchOrder(0);
    });
  }

  handlePageChange(event: number) {
    this.currentPage =  event;
    this.purchaseOrder.page = event;
    this.searchOrder(0);
  }

  searchOrder(page: number) {
    const orderSearch: PurchaseOrderModel = this.purchaseOrder;
    orderSearch.page = page;
    if (this.purchaseOrder.searchKey !== null) {
      orderSearch.searchKey = this.purchaseOrder.searchKey.trim();
    }
    this.getPurchaseOrderPage(orderSearch);
  }
}
