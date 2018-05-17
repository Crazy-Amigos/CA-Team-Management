import { Component, OnInit , TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CategoryService} from '../category.service';
import {Category} from '../variable/category';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [CategoryService]
})
export class GroupComponent implements OnInit {
  modalRef: BsModalRef;


  constructor( private modalService: BsModalService , private _categoryService: CategoryService) { }

  ngOnInit() {
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
        this.modalRef.hide();
      });
  }

}
