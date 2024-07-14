import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ComicModel} from "../../../models/ComicModel";
import {ComicService} from "../../../core/service/comic.service";
import {calculatePrice} from "../../../helpers/constants";
import {Page} from "../../../models/Page";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-more-product',
  templateUrl: './more-product.component.html',
  styleUrl: './more-product.component.css',
})
export class MoreProductComponent implements OnInit{

  listPath: string[];
  LINK_IMAGE: string = `${environment.FILE_COMIC_URL}`

  constructor(
      private router: Router,
      private comicService: ComicService,
      private activatedRouter: ActivatedRoute,
      private cdr: ChangeDetectorRef
  ) {
    this.activatedRouter.queryParams.subscribe((param: Params): void => {
      this.comicObject.typeComicId = param["typeComicId"];
      this.comicObject.searchKey = param["searchKey"];
    })
    this.listPath = ["Trang chủ"];
  }

  comicsPage: Page<ComicModel> = new Page<ComicModel>();
  comicObject: ComicModel = new ComicModel();
  currentPage: number = 0;
  numberComic: number = 0;
  pageSize: number = 9;
  protected readonly calculatePrice = calculatePrice;

  ngOnInit(): void {
    this.comicObject.pageSize = 9
    this.activatedRouter.queryParams.subscribe((param: Params): void => {
      this.comicObject.typeComicId = param["typeComicId"];
      this.comicObject.searchKey = param["searchKey"];
      this.searchComic(0);
    })
  }

  getComics(comic: ComicModel) {
    if (comic.searchKey) {
      this.comicService.searchComic(comic).subscribe((res: Page<ComicModel>) => {
        this.comicsPage = res;
        if (res.content) {
          this.numberComic = res.content.length;
        }
        this.cdr.detectChanges();
      })
    } else {
      this.comicService.getListComicByType(comic).subscribe((res: Page<ComicModel>) => {
        this.comicsPage = res;
        if (res.content) {
          this.numberComic = res.content.length;
        }
        this.cdr.detectChanges();
      })
    }
  }

  goToDetail(id: number | null): void {
    this.router.navigate(["/more-products/detail/" + id], {
      queryParams: {
        id
      }
    });
  }

  handlePageChange(event: number) {
    this.comicObject.page = event;
    this.currentPage = event;
    this.searchComic(event);
  }

  searchComic(page: number) {
    const comicSearch: ComicModel = this.comicObject;
    comicSearch.page = page;
    if (this.comicObject.searchKey) {
      comicSearch.searchKey = this.comicObject.searchKey.trim();
    }
    this.getComics(comicSearch);
  }
}
