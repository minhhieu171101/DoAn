import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/UserModel";
import {ResponseModel} from "../../../models/response/ResponseModel";
import {AuthService} from "../../../core/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {IconDefinition, faCamera} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
    user: UserModel = new UserModel();
    listPath: string[] = ["Trang chủ", "Thông tin người dùng"]
    URL_FILE: string = `${environment.FILE_AVATAR_URL}`;
    tempUserImgUpload: string | ArrayBuffer | null | undefined;
    faCamera: IconDefinition = faCamera;
    gender: string | undefined;

    constructor(
        private authService: AuthService,
        private toaStr: ToastrService,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.getUserInfo();
    }

    getUserInfo(): void {
        this.user.username = this.authService.getCurrentUserUsername();
        this.authService.getInfoUser(this.user).subscribe((res: ResponseModel<UserModel>): void => {
            if (res.data !== null) {
                this.user = res.data;
                this.gender = res.data.gender?.toString();
                this.cdr.detectChanges();
            }
        })
    }

    updateUserInfo() {
        this.user.gender = Number(this.gender);
        this.authService.updateUserInfo(this.user).subscribe((res: ResponseModel<String>) => {
            if (res.status === "OK") {
                this.toaStr.success(res.message);
                this.tempUserImgUpload = undefined;
                this.user.file = null;
                this.getUserInfo();
                this.cdr.detectChanges();
            } else  {
                this.toaStr.error(res.message);
            }
        })
    }

    updateImage(files: FileList | null): void {
        if (files !== null) {
            this.user.file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.tempUserImgUpload = reader.result;
            };
            reader.readAsDataURL(this.user.file);
        }
    }

    convertDate(birthday: Date | null): string | null {
        return this.datePipe.transform(birthday, 'yyyy-MM-dd')
    }

    updateBirthDay(date: string): void {
        this.user.birthday = new Date(date);
    }
}
