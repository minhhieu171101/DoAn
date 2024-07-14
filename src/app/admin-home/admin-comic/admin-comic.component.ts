import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminComicPopupComponent} from "./admin-comic-popup/admin-comic-popup.component";
import {AdminDeleteComponent} from "./admin-delete/admin-delete.component";
import {Router} from "@angular/router";
import {ComicService} from "../../core/service/comic.service";
import {ComicModel} from "../../models/ComicModel";
import {Page} from "../../models/Page";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-admin-comic',
  templateUrl: './admin-comic.component.html',
  styleUrl: './admin-comic.component.scss'
})
export class AdminComicComponent  implements OnInit{

  isDialogOpen: boolean = false;
  comic: ComicModel = new ComicModel();
  pageComic: Page<ComicModel> = new Page<ComicModel>();
  currentPage: number = 0;
  numberComic: number = 0;
  pageSize: number = 0;
  URL_FILE: string = `${environment.FILE_COMIC_URL}`;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private comicService: ComicService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.comic.pageSize = 10;
    this.pageSize = 10;
    this.searchComic(0);
  }

  getComicAdminPage(comic: ComicModel) {
    this.comicService.getComicPageAdmin(comic).subscribe((res: Page<ComicModel>) => {
      this.pageComic = res;
      if (res.content) {
        this.numberComic = res.content.length;
      }
      this.cdr.detectChanges();
    })
  }

  openDialog(comic: ComicModel): void {
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(AdminComicPopupComponent, {
      width: '500px',
      data: comic
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      this.searchComic(0);
    });
  }

  openDialogDelete(comic: ComicModel): void {
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(AdminDeleteComponent, {
      data: comic
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      this.searchComic(0);
    });
  }

  handlePageChange(event: any) {
    this.comic.page = event;
    this.searchComic(event);
  }

  searchComic(page: number) {
    const comicSearch: ComicModel = this.comic;
    comicSearch.page = page;
    if (this.comic.searchKey !== null) {
      comicSearch.searchKey = this.comic.searchKey.trim();
    }

    this.getComicAdminPage(comicSearch);
  }
}
