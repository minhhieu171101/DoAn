import {Component, OnInit} from '@angular/core';
import {faCartShopping, faHeadset, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {ComicOrderService} from "../core/service/comic-order.service";
import {StatisticComicModel} from "../models/StatisticComicModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faHeadset = faHeadset;
  protected readonly faCartShopping = faCartShopping;
  statisticComics: StatisticComicModel[] = [];
  totalMonthIncome: number = 0;
  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: number[] =  [2020,2021,2022,2023,2024];
  statisticComic: StatisticComicModel = new StatisticComicModel();

  constructor(
      private comicOrderService: ComicOrderService,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.statisticComic.month = new Date().getMonth() + 1
    this.statisticComic.year = (new Date()).getFullYear()
    this.getStatistic();
  }

  getStatistic() {
    this.comicOrderService.getStatisticComic(this.statisticComic).subscribe((res: StatisticComicModel[]) => {
      this.statisticComics = res;
      this.totalMonthIncome = 0;
      for (let comic of this.statisticComics) {
        this.totalMonthIncome += comic.totalIncome;
      }
    })
  }
}
