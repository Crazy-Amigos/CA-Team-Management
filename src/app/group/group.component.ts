import { Component, OnInit , TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CategoryService} from '../category.service';
import {Category} from '../variable/category';
import {ToasterService} from '../toaster.service';
import {Group} from '../variable/group';
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
  groups: Array<Group>;
  _cat;
  _id;
  private viewGoupContainer: boolean = true ;
  constructor(
    private modalService: BsModalService ,
    private _categoryService: CategoryService,
    private _toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.viewCategory();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModel() {
    this.modalRef.hide();
  }
  submitNewGroup(group: Group) {
    this._categoryService.addGroup(group)
      .subscribe(resNewGroup => {
        if (resNewGroup.status === 200) {
          this._toasterService.Success(resNewGroup.message);
          this.modalRef.hide();
          this.viewGroup(resNewGroup._id);
        } else {
          this._toasterService.Warning(resNewGroup.message);
        }
      });
  }
  submitNewCategory(category: Category) {
    this._categoryService.addCategory(category)
      .subscribe(resNewCategory => {
        if (resNewCategory.status === 200) {
          this._toasterService.Success(resNewCategory.message);
          this.modalRef.hide();
          this.viewCategory();
        } else {
          this._toasterService.Warning(resNewCategory.message);
        }

      });
  }
  viewCategory() {
    this._categoryService.viewCategory()
      .subscribe(resCategory =>  this.categorys = resCategory);
  }
  viewGroupDetails(category: Category) {
    this._id = category._id;
    this._cat = category.category;
    this.viewGoupContainer = false ;
    this.viewGroup(this._id) ;
  }
  viewGroup(category_id) {
    this._categoryService.viewGroup(category_id)
      .subscribe(resAllGroup => this.groups = resAllGroup);
  }
}
