import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComicModel} from "../../../models/ComicModel";
import {ComicService} from "../../../core/service/comic.service"
import {ToastrService} from "ngx-toastr";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-comic-popup',
  templateUrl: './admin-comic-popup.component.html',
  styleUrl: './admin-comic-popup.component.scss'
})
export class AdminComicPopupComponent {
  comic: ComicModel = new ComicModel();

  constructor(
    public dialogRef: MatDialogRef<AdminComicPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComicModel,
    private comicService: ComicService,
    private toaStr: ToastrService
  ) {
    this.comic = data;
  }

  closePopup() {
    this.dialogRef.close();
  }

  updateComic() {
    this.comicService.updateComic(this.comic).subscribe((res: ResponseModel<String>) => {
      if (res.status === "OK") {
        this.toaStr.success(res.message);
        this.comic.file = null;
        this.dialogRef.close();
      } else {
        this.toaStr.error(res.message);
      }
    })
  }

    uploadImage(files: FileList | null) {
      if (files !== null) {
        this.comic.file = files[0];
      }
    }

  protected readonly faCamera = faCamera;
}
