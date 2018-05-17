import { Component, OnInit , TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CategoryService} from '../category.service';
import {Category} from '../variable/category';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [CategoryService]
})
export class GroupComponent implements OnInit {
  modalRef: BsModalRef;
  categorys: Array<Category>;
  constructor( private modalService: BsModalService , private _categoryService: CategoryService ) {}

  ngOnInit() {
    this.viewCategory();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModel() {
    this.modalRef.hide();
  }
  submitNewCategory(category: Category) {
    this._categoryService.addCategory(category)
      .subscribe(resNewCategory => {
        if (resNewCategory.status === '200') {
          // this.showSuccess();
          this.modalRef.hide();
          this.viewCategory();
        } else {
          // this.showError();
        }

      });
  }
  viewCategory() {
    this._categoryService.viewCategory()
      .subscribe(resCategory =>  this.categorys = resCategory);
  }


}
