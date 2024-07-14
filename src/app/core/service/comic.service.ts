import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ComicModel} from "../../models/ComicModel";
import {ComicDetailModel} from "../../models/ComicDetailModel";
import {Page} from "../../models/Page";
import {ResponseModel} from "../../models/response/ResponseModel";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComicService {

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
  
  getListComicLandingPage(comic: ComicModel): Observable<ComicModel[]> {
    return this.httpClient.post<ComicModel[]>(
        `${this.API}comic/list-comic`,
        comic,
        this.httpOptions
    );
  }
  
  getDetailComic(id: number): Observable<ComicDetailModel> {
    return this.httpClient.get<ComicDetailModel>(`${this.API}comic/detail/${id}`);
  }

  getListComicByType(comic: ComicModel): Observable<Page<ComicModel>> {
    return this.httpClient.post<Page<ComicModel>>(
        `${this.API}comic/page-comic`,
        comic,
        this.httpOptions
    );
  }

  getComicPageAdmin(comic: ComicModel): Observable<Page<ComicModel>> {
    return this.httpClient.post<Page<ComicModel>>(
        `${this.API}comic/comic-management-admin`,
        comic,
        this.httpOptions
    );
  }

  updateComic(comic: ComicModel): Observable<ResponseModel<String>> {
    const formData = new FormData();
    if (comic.releaseDate instanceof Date) {
      comic.releaseDate = comic.releaseDate?.toISOString();
    }
    formData.append("comic", new Blob([JSON.stringify(comic)], {type: 'application/json'}));
    if (comic.file !== null) {
      formData.append("file", comic.file)
    }
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comic/update-comic`,
        formData,
        this.httpOptions
    );
  }

  deleteComic(comic: ComicModel): Observable<ResponseModel<String>> {
    return this.httpClient.post<ResponseModel<String>>(
        `${this.API}comic/delete-comic`,
        comic,
        this.httpOptions
    );
  }

  searchComic(comic: ComicModel): Observable<Page<ComicModel>> {
    return this.httpClient.post<Page<ComicModel>>(
        `${this.API}comic/comic-search`,
        comic,
        this.httpOptions
    );
  }
}
