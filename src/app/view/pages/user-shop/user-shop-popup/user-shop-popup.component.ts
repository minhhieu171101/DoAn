import {Component, Inject} from '@angular/core';
import {PurchaseOrderModel} from "../../../../models/PurchaseOrderModel";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserOrderService} from "../../../../core/service/user-order.service";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../../models/response/ResponseModel";

@Component({
  selector: 'app-user-shop-popup',
  templateUrl: './user-shop-popup.component.html',
  styleUrl: './user-shop-popup.component.scss'
})
export class UserShopPopupComponent {
  userOrder: PurchaseOrderModel = new PurchaseOrderModel();
  status: string | undefined = this.userOrder.status?.toString();

  constructor(
      public dialogRef: MatDialogRef<UserShopPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userOrderService: UserOrderService,
      private toaStr: ToastrService
  ) {
    this.userOrder.userOrderId = this.data?.userOrderId;
    this.status = this.data?.status.toString();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    this.userOrder.status = Number(this.status);
    this.userOrderService.updateStatusOrder(this.userOrder).subscribe((res: ResponseModel<String>) => {
      if (res.status === "OK") {
        this.toaStr.success(res.message);
        this.dialogRef.close();
      } else {
        this.toaStr.error(res.message);
      }
    })
  }
}
