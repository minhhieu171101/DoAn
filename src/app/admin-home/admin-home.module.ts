import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {AdminShopComponent} from "./admin-shop/admin-shop.component";
import {AdminDeleteComponent} from "./admin-comic/admin-delete/admin-delete.component";
import {AdminCommentComponent} from "./admin-comment/admin-comment.component";
import {AdminComicComponent} from "./admin-comic/admin-comic.component";
import {AdminComicPopupComponent} from "./admin-comic/admin-comic-popup/admin-comic-popup.component";
import {AdminHomeComponent} from "./admin-home.component";
import {FormsModule} from "@angular/forms";
import {DeleteCommentComponent} from "./admin-comment/delete-comment/delete-comment.component";
import {ComponentsModule} from "../components/components.module";
import {AdminShopPopupComponent} from "./admin-shop/admin-shop-popup/admin-shop-popup.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
      AdminUserComponent,
      AdminShopComponent,
      AdminDeleteComponent,
      AdminCommentComponent,
      AdminComicComponent,
      AdminComicPopupComponent,
      AdminHomeComponent,
      DeleteCommentComponent,
      AdminShopPopupComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        FaIconComponent
    ]
})
export class AdminHomeModule { }
