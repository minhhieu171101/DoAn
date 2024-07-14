import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommentModel} from "../../models/CommentModel";
import {Observable} from "rxjs";
import {Page} from "../../models/Page";
import {ResponseModel} from "../../models/response/ResponseModel";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  public getCommentPage(comment: CommentModel): Observable<Page<CommentModel>> {
    return this.httpClient.post<Page<CommentModel>>(
        `${this.API}comment/page-comment`,
        comment,
        this.httpOptions
    );
  }

  public deleteComment(comment: CommentModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comment/delete-comment`,
        comment,
        this.httpOptions
    );
  }

  public createComment(comment: CommentModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comment/update-comment`,
        comment, this.httpOptions
    );
  }
}
