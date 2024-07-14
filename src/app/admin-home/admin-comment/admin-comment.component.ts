import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CommentService} from "../../core/service/comment.service";
import {CommentModel} from "../../models/CommentModel";
import {Page} from "../../models/Page";
import {ToastrService} from "ngx-toastr";
import {DeleteCommentComponent} from "./delete-comment/delete-comment.component";
import {ComicModel} from "../../models/ComicModel";

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrl: './admin-comment.component.scss'
})
export class AdminCommentComponent implements OnInit{

  comment: CommentModel = new CommentModel();
  commentPage: Page<CommentModel> = new Page<CommentModel>()
  currentPage: number = 0;
  numberComment: number = 0;
  pageSize: number = 0;

  constructor(
      public dialog: MatDialog,
      private commentService: CommentService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.comment.pageSize = 10;
    this.searchComment(0);
  }

  getPageCommentModel(comment: CommentModel) {
    this.commentService.getCommentPage(comment).subscribe((res: Page<CommentModel>) => {
      this.commentPage = res;
      if (res.content) {
        this.numberComment = res.content.length;
      }
      this.cdr.detectChanges();
    })
  }

  openDialogDelete(comment: CommentModel): void {
    const dialogRef = this.dialog.open(DeleteCommentComponent, {
      data: comment
    });

    dialogRef.afterClosed().subscribe(result => {
      this.searchComment(0);
      this.cdr.detectChanges();
    });
  }

  handlePageChange(event: any) {
    this.comment.page = event;
    this.currentPage = event;
    this.searchComment(event);
  }

  searchComment(page: number) {
    const commentSearch: CommentModel = this.comment;
    commentSearch.page = page;
    if (this.comment.searchKey !== null) {
      commentSearch.searchKey = this.comment.searchKey.trim();
    }

    this.getPageCommentModel(commentSearch);
  }
}
