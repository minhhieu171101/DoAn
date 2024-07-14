import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  faBars,
  faCaretDown,
  faBookOpen,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {NavbarService} from "../../core/service/navbar.service";
import {TypeComic} from "../../models/TypeComic";
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{
  faBars: IconDefinition = faBars;
  faCaretDown: IconDefinition = faCaretDown;
  faBookOpen: IconDefinition = faBookOpen;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  typeComics: TypeComic[] | undefined;
  currentType: number | undefined

  listImageSlide: string[] = [
    "../../assets/images/slide-1.jpg",
    "../../assets/images/slide-2.jpg",
    "../../assets/images/slide-3.jpg"
  ]

  listImageQC: string[] = [
    "../../assets/images/qc-1.jpg",
    "../../assets/images/qc-2.jpg",
    "../../assets/images/qc-3.jpg"
  ]

  ngOnInit(): void {
    this.navbarService
        .getListTypeComic()
        .subscribe((res: TypeComic[]): void => {
      this.typeComics = res;
      this.itemActive();
    })
  }

  constructor(
      private navbarService: NavbarService,
      private router: Router,
      private cdr: ChangeDetectorRef
  ) {
  }

  slickInit(event: any): void {
    console.log('Slick initialized');
  }

  breakpoint(event: any): void {
    console.log('Slick initialized');
  }
  afterChange(event: any) {
    console.log('Slick initialized');
  }
  beforeChange(event: any) {
    console.log('Slick initialized');
  }

  findForType(id: number | null): void {
    this.router.navigate(["/more-products/"], {
      queryParams: {
        typeComicId: id
      }
    });
  }

  toWishlist() {
    this.router.navigate(["/wishlist"])
  }

  itemActive(): number {
    this.currentType = Number(this.router.url.split("=")[1]);
    return this.currentType;
  }

  viewMore(): void {
    this.router.navigate(["/more-products"], {
      queryParams: {
        typeComicId: null
      }
    });
  }
}
