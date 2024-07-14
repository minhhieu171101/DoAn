import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./view/pages/home/home.component";
import {LoginComponent} from "./view/pages/login/login.component";
import {ProductDetailComponent} from "./view/pages/product-detail/product-detail.component";
import {MoreProductComponent} from "./view/pages/more-product/more-product.component";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {UserComponent} from "./view/pages/user/user.component";
import {PayComponent} from "./view/pages/pay/pay.component";
import {CartComponent} from "./view/pages/cart/cart.component";
import {AdminUserComponent} from "./admin-home/admin-user/admin-user.component";
import {AdminComicComponent} from "./admin-home/admin-comic/admin-comic.component";
import {AdminCommentComponent} from "./admin-home/admin-comment/admin-comment.component";
import {AdminShopComponent} from "./admin-home/admin-shop/admin-shop.component";
import {AuthGuardService} from "./core/service/auth-guard.service";
import {NoAuthGuardService} from "./core/service/no-auth-guard.service";
import {WishlistComponent} from "./view/pages/wishlist/wishlist.component";
import {AdminAuthGuardService} from "./core/service/admin-auth-guard.service";
import {UserShopComponent} from "./view/pages/user-shop/user-shop.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuardService]},
  {
    path: 'more-products',
    children: [
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
      { path: '', component: MoreProductComponent },
    ],
  },
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'pay', component: PayComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuardService]},

  {path: 'admin-user', component: AdminUserComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin-comic', component: AdminComicComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin-comment', component: AdminCommentComponent, canActivate: [AdminAuthGuardService]},
  {path: 'admin-shop', component: AdminShopComponent, canActivate: [AdminAuthGuardService]},

  {path: 'user-shop', component: UserShopComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, NoAuthGuardService, AdminAuthGuardService]
})
export class AppRoutingModule { }
