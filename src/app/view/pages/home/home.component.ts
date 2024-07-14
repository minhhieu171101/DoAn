import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  listPath: string[];

  constructor() {
    this.listPath = ["Trang chủ"]
  }
}
