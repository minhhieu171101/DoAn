import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {AUTH_REQUEST} from "../../helpers/message";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router,
              private toaStr:ToastrService
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.getCurrentUserRole())
    if (this.authService.isLoggedIn() && this.authService.getCurrentUserRole() === "ROLE_ADMIN") {
      return true;
    } else {
      this.toaStr.warning(AUTH_REQUEST);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
