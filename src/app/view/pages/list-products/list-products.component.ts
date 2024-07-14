import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {faAnglesRight, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {ComicService} from "../../../core/service/comic.service";
import {ComicModel} from "../../../models/ComicModel";
import {Router} from "@angular/router";
import {calculatePrice} from "../../../helpers/constants";
import {AuthService} from "../../../core/service/auth.service";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit{
  faAnglesRight: IconDefinition = faAnglesRight;
  page: number = 0;
  pageSize: number = 9;
  comics: ComicModel[];
  comic: ComicModel = new ComicModel();
  LINK_IMAGE: string = `${environment.FILE_COMIC_URL}`

  constructor(
      private listProductService: ComicService,
      private router: Router,
      private cdr: ChangeDetectorRef,
      private authservice: AuthService
  ) {
    this.comics = [];
  }

  ngOnInit(): void {
    this.authservice.getCurrentUserRole();
    console.log(this.authservice.getCurrentUserRole());
    this.getListComic();
  }

  getListComic(): void {
    this.comic.page = this.page;
    this.comic.pageSize = this.pageSize;
    this.listProductService
        .getListComicLandingPage(this.comic)
        .subscribe((res: ComicModel[]): void => {
      this.comics = res;
      this.cdr.detectChanges();
    })
  }

  viewMore(): void {
    this.router.navigate(["/more-products"], {
      queryParams: {
        typeComicId: null
      }
    });
  }

  goToDetail(id: number | null): void {
    this.router.navigate(["/more-products/detail/" + id], {
      queryParams: {
        id
      }
    });
  }

  protected readonly calculatePrice = calculatePrice;
}
