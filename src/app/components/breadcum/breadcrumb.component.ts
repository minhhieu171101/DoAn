import {ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  @Input("listPath") listPath: string[]  = []

  constructor(
      private cdr: ChangeDetectorRef
  ) {
  }

}
