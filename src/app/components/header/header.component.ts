import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  faMagnifyingGlass,
  faHeadset,
  faCartShopping, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";
import {UserModel} from "../../models/UserModel";
import {ResponseModel} from "../../models/response/ResponseModel";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faHeadset: IconDefinition = faHeadset;
  faCartShopping: IconDefinition = faCartShopping;
  isLogin: boolean | undefined;
  userObject: UserModel = new UserModel();
  searchKey: string | null = null;

  constructor(
      private router: Router,
      private authService: AuthService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLogin = this.authService.isLoggedIn();
        if (this.isLogin) {
          this.getUserInfo();
        }
        this.cdr.detectChanges();
      }
    })
  }


  routerHome(): void {
    this.router.navigate(["/home"]);
  }

  getUserInfo(): void {
    this.userObject.username = this.authService.getCurrentUserUsername();
    this.authService.getInfoUser(this.userObject).subscribe((res: ResponseModel<UserModel>): void => {
      if (res.data !== null) {
        this.userObject = res.data;
      }
      this.cdr.detectChanges();
    })
  }

  routerLogin(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/user"]);
    } else {
      this.router.navigate(["/login"])
    }
  }

  routerCart(): void {
    this.router.navigate(["/cart"]);
  }

  signOut(): void {
    localStorage.clear();
    this.setLogin(false);
    this.router.navigate(["/login"])
  }

  setLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.cdr.detectChanges();
  }

  search() {
    this.router.navigate(["/more-products"], {
      queryParams: {
        searchKey: this.searchKey
      }
    })
  }
}
