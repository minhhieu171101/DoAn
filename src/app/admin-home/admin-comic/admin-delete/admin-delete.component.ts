import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComicModel} from "../../../models/ComicModel";
import {ComicService} from "../../../core/service/comic.service";
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../models/response/ResponseModel";

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrl: './admin-delete.component.scss'
})
export class AdminDeleteComponent {
  comic: ComicModel = new ComicModel();

  constructor(
    public dialogRef: MatDialogRef<AdminDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComicModel,
    private comicService: ComicService,
    private toaStr: ToastrService
  ) {
    this.comic = this.data;
  }

  deleteComic() {
    this.comicService.deleteComic(this.comic).subscribe((res: ResponseModel<String>) => {
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
