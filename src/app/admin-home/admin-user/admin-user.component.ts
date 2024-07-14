import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";
import {UserModel} from "../../models/UserModel";
import {Page} from "../../models/Page";
import {environment} from "../../../environments/environment";
import {PurchaseOrderModel} from "../../models/PurchaseOrderModel";
import {CommentModel} from "../../models/CommentModel";
import {DeleteCommentComponent} from "../admin-comment/delete-comment/delete-comment.component";
import {DeleteUserComponent} from "./delete-user/delete-user.component";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent implements OnInit{

  user: UserModel = new UserModel();
  pageUser: Page<UserModel> = new Page<UserModel>();
  currentPage: number = 0;
  numberUser: number = 0;
  pageSize: number = 0;
  URL_FILE: string = `${environment.FILE_AVATAR_URL}`;

  constructor(
      public dialog: MatDialog,
      private router: Router,
      private authService: AuthService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user.pageSize = 10;
    this.pageSize = 10;
    this.searchUser(0);
  }

  getPageUserInfo(user: UserModel) {
    this.authService.getPageUserInfo(user).subscribe((res: Page<UserModel>) => {
      this.pageUser = res;
      if (res.content) {
        this.numberUser = res.content.length;
      }
      this.cdr.detectChanges();
    })
  }

  handlePageChange(event: number) {
    this.user.page = event;
    this.currentPage = event;
    this.searchUser(event);
  }

  searchUser(page: number) {
    const userSearch: UserModel = this.user;
    userSearch.page = page;
    if (this.user.searchKey !== null) {
      userSearch.searchKey = this.user.searchKey.trim();
    }
    this.getPageUserInfo(userSearch);
  }

  openDialogDelete(user: UserModel): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.searchUser(0);
      this.cdr.detectChanges();
    });
  }
}
