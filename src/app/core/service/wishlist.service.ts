import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../models/Page";
import {ResponseModel} from "../../models/response/ResponseModel";
import {WishlistModel} from "../../models/WishlistModel";
import {environment} from "../../../environments/environment";
import {CommentModel} from "../../models/CommentModel";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

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

  public getWishlistPage(wishlistModel: WishlistModel): Observable<Page<WishlistModel>> {
    return this.httpClient.post<Page<WishlistModel>>(
        `${this.API}wishlist/page-wishlist`,
        wishlistModel,
        this.httpOptions
    );
  }

  public addToWishlist(wishlistModel: WishlistModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}wishlist/add-wishlist`,
        wishlistModel,
        this.httpOptions
    );
  }

  public deleteWishlist(wishlistModel: WishlistModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
      `${this.API}wishlist/delete-wishlist`,
      wishlistModel,
      this.httpOptions
    );
  }

}
