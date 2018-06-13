import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CategoryService]
})
export class DashboardComponent implements OnInit {
  public count;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoryCount();
  }
  getCategoryCount() {
    this._categoryService.viewCategoryCount()
      .subscribe(resCount => this.count = resCount);
  }

}
