import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() totalElement: number;
  @Input() totalPage: number;
  @Input() elementInCurrentPage: number;

  constructor() {
    this.currentPage = 0;
    this.pageSize = 0;
    this.totalElement = 0;
    this.totalPage = 0;
    this.elementInCurrentPage = 0;
  }

  @Output() pageChange= new EventEmitter<number>();

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  firstPage() {
    this.currentPage = 0;
    this.pageChange.emit(0);
  }

  lastPage() {
    this.currentPage = this.totalPage - 1;
    this.pageChange.emit(this.totalPage - 1);
  }

  choosePage(number: number) {
    this.currentPage = number;
    this.pageChange.emit(number);
  }
}
