import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserOrderModel} from "../../models/UserOrderModel";
import {ResponseModel} from "../../models/response/ResponseModel";
import {PurchaseOrderModel} from "../../models/PurchaseOrderModel";
import {Page} from "../../models/Page";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private API: string = `${environment.API}`;

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    }),
  };

  constructor(
      private httpClient: HttpClient
  ) { }

  public order(userOrder: UserOrderModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}user-order/create-order`,
        userOrder,
        this.httpOptions
    );
  }

  public getPurchaseOrderPage(purchaseOrder: PurchaseOrderModel): Observable<Page<PurchaseOrderModel>> {
    return this.httpClient.post<Page<PurchaseOrderModel>>(
        `${this.API}user-order/purchase-order`,
        purchaseOrder,
        this.httpOptions
    );
  }

  public updateStatusOrder(purchaseOrder: PurchaseOrderModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}user-order/update-order`,
        purchaseOrder,
        this.httpOptions
    );
  }

  public getPurchaseOrderUserPage(purchaseOrder: PurchaseOrderModel): Observable<Page<PurchaseOrderModel>> {
    return this.httpClient.post<Page<PurchaseOrderModel>>(
        `${this.API}user-order/purchase-order-user`,
        purchaseOrder,
        this.httpOptions
    );
  }
}
