import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  currentUrl: string = ''

  constructor(
      private router: Router,
      private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getCurrentPage();
  }

  routerHomeAdmin(): void {
    this.router.navigate(["/admin-home"]);
  }

  routerComicAdmin(): void {
    this.router.navigate(["/admin-comic"]);
  }

  routerUserAdmin(): void {
    this.router.navigate(["/admin-user"]);
  }

  routerCommentAdmin(): void {
    this.router.navigate(["/admin-comment"]);
  }

  routerShopAdmin(): void {
    this.router.navigate(["/admin-shop"]);
  }

  getCurrentPage() {
    this.currentUrl = this.router.url.split("/")[1];
    this.cdr.detectChanges()
  }
}
