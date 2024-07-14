import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {BreadcrumbComponent} from "./breadcum/breadcrumb.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SlickCarouselModule} from "ngx-slick-carousel";


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        BreadcrumbComponent,
        NavbarComponent,
        PaginationComponent,
        SidebarComponent
    ],
    exports: [
        SidebarComponent,
        PaginationComponent,
        BreadcrumbComponent,
        NavbarComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FaIconComponent,
        SlickCarouselModule
    ]
})
export class ComponentsModule {
}
