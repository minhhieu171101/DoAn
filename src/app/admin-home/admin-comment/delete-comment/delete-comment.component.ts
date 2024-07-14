import {Component, Inject} from '@angular/core';
import {ComicModel} from "../../../models/ComicModel";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {CommentModel} from "../../../models/CommentModel";
import {CommentService} from "../../../core/service/comment.service";

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrl: './delete-comment.component.scss'
})
export class DeleteCommentComponent {

  comment: CommentModel = new CommentModel();

  constructor(
      public dialogRef: MatDialogRef<DeleteCommentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CommentModel,
      private commentService: CommentService,
      private toaStr: ToastrService
  ) {
    this.comment = this.data;
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment).subscribe((res: ResponseModel<String>) => {
      if (res.status === "OK") {
        this.toaStr.success(res.message);
        this.dialogRef.close();
      } else {
        this.toaStr.error(res.message);
      }
    })
  }

  closePopup() {
    this.dialogRef.close();
  }
}
