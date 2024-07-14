import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PurchaseOrderModel} from "../../../models/PurchaseOrderModel";
import {UserOrderService} from "../../../core/service/user-order.service";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-shop-popup',
  templateUrl: './admin-shop-popup.component.html',
  styleUrl: './admin-shop-popup.component.scss'
})
export class AdminShopPopupComponent {

  userOrder: PurchaseOrderModel = new PurchaseOrderModel();
  status: string | undefined = this.userOrder.status?.toString();

  constructor(
    public dialogRef: MatDialogRef<AdminShopPopupComponent>,
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
