import {Component, Inject} from '@angular/core';
import {ComicModel} from "../../../models/ComicModel";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {CommentModel} from "../../../models/CommentModel";
import {AuthService} from "../../../core/service/auth.service";
import {UserModel} from "../../../models/UserModel";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {

  user: UserModel = new UserModel();

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private authService: AuthService,
    private toaStr: ToastrService
  ) {
    this.user = this.data;
  }

  deleteUser() {
    this.authService.deleteUser(this.user).subscribe((res: ResponseModel<String>) => {
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
