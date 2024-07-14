import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ComicOrderModel} from "../../models/ComicOrderModel";
import {UserModel} from "../../models/UserModel";
import {StatisticComicModel} from "../../models/StatisticComicModel";
import {ResponseModel} from "../../models/response/ResponseModel";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComicOrderService {

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

  getComicOrders(user: UserModel): Observable<ComicOrderModel[]> {
    return this.httpClient.post<ComicOrderModel[]>(
        `${this.API}comic-order/order-list`,
        user,
        this.httpOptions
    );
  }

  createComicOrder(comicOrder: ComicOrderModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comic-order/create-order`,
        comicOrder,
        this.httpOptions
    )
  }

  deleteComicOrder(comicOrder: ComicOrderModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comic-order/delete`,
        comicOrder,
        this.httpOptions
    )
  }

  getStatisticComic(statisticComic: StatisticComicModel): Observable<StatisticComicModel[]> {
    return this.httpClient.post<StatisticComicModel[]>(`${this.API}comic-order/statistic`, statisticComic, this.httpOptions)
  }
}
