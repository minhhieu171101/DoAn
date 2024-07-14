import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeComic} from "../../models/TypeComic";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

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

  getListTypeComic(): Observable<TypeComic[]> {
    return this.httpClient.get<TypeComic[]>(`${this.API}type-comic/list-type-comic`);
  }
}
