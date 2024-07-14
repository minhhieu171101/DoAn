import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminShopPopupComponent} from "./admin-shop-popup/admin-shop-popup.component";
import {Router} from "@angular/router";
import {UserOrderService} from "../../core/service/user-order.service";
import {PurchaseOrderModel} from "../../models/PurchaseOrderModel";
import {Page} from "../../models/Page";
import {ComicModel} from "../../models/ComicModel";

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrl: './admin-shop.component.scss'
})
export class AdminShopComponent implements OnInit{
  purchaseOrder: PurchaseOrderModel = new PurchaseOrderModel();
  purchasePage: Page<PurchaseOrderModel> = new Page<PurchaseOrderModel>();
  currentPage: number = 0;
  numberPurchase: number = 0;
  pageSize: number = 0;

  constructor(
      public dialog: MatDialog,
      private router: Router,
      private userOrderService: UserOrderService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.purchaseOrder.pageSize = 10;
    this.pageSize = 10;
    this.searchOrder(0);
  }

  getPurchaseOrderPage(purchaseOrder: PurchaseOrderModel) {
    this.userOrderService.getPurchaseOrderPage(purchaseOrder).subscribe((res: Page<PurchaseOrderModel>) => {
      this.purchasePage = res;
      if (res.content) {
        this.numberPurchase = res.content.length;
      }
      this.cdr.detectChanges();
    })
  }

  openDialogShop(purchase: PurchaseOrderModel): void {
    const dialogRef = this.dialog.open(AdminShopPopupComponent, {
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
    this.searchOrder(event);
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
