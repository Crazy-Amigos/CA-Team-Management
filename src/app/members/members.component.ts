import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {MemberService} from '../member.service';
import { Member} from '../variable/member';
import { CategoryService} from '../category.service';
import {Category} from '../variable/category';
import {Group} from '../variable/group';
import {CategoryDetails} from '../variable/detaildCategory';
import {TeamService} from '../team.service';
import {Team} from '../variable/team';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService, CategoryService , TeamService]
})
export class MembersComponent implements OnInit {
  modalRef: BsModalRef;
  members: Array<Member>;
  teams: Array<Team>;
  categorys: Array<Category>;
  groups: Array<Group>
  catDetails: Array<CategoryDetails>
  selectedMembers: Member;
  arryCat = [];
  constructor(
    private _modelService: BsModalService ,
    private _memberService: MemberService ,
    private _categoryServie: CategoryService,
    private _teamService: TeamService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modelService.show(template);
    this.getTeamDetails();
  }
  closeModel() {
    this.modalRef.hide();
  }
  getTeamDetails() {
    this._teamService.getTeam()
      .subscribe(resTeamDeatails => this.teams = resTeamDeatails);
  }
  /*
  submitNewMember(member: Member) {
    member.group = this.arryCat;
    this._memberService.addmbers(member)
      .subscribe(resNewMember => {
        this.modalRef.hide();
        console.log('Success');
     });
  }
  getCategorys() {
    this._categoryServie.viewCategory()
      .subscribe(resCategory => this.categorys = resCategory);
  }
  chengeVale(_catId) {
    this._categoryServie.viewGroup(_catId)
      .subscribe((resGroup => this.groups = resGroup));
  }
  getDetaildCategorry() {
    this._categoryServie.viewDetaildCategory()
      .subscribe(resCategorry => this.catDetails = resCategorry);
  }
  getTeamDetails() {
    this._teamService.getTeam()
      .subscribe(resTeamDeatails => this.teams = resTeamDeatails);
  }
  getDetaildMembers(_id) {
    this._memberService.getMember(_id)
      .subscribe(resMember => this.members = resMember);
  }
  setValue(evnt, data) {
    console.log(evnt);
    // alert(evnt);
    if ( evnt.checked === true) {
      this.arryCat.push(data);
    } else {
      const index = this.arryCat.indexOf(data, 0);
      if (index > -1) {
        this.arryCat.splice(index, 1);
      }
    }
    console.log(this.arryCat);
  }
  openEditModel(template: TemplateRef<any> , member: Member ) {
    this.modalRef = this._modelService.show(template);
    this.getDetaildCategorry();
    this.getDetaildMembers(member._id);
  }
  */

}
