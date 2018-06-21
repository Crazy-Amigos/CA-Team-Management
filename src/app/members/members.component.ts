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
import {ToasterService} from '../toaster.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService, CategoryService , TeamService, ToasterService]
})
export class MembersComponent implements OnInit {
  fileList: FileList ;
  public file_srcs: string[] = [];
  data: any;
  modalRef: BsModalRef;
  members: Array<Member>;
  teams: Array<Team>;
  testMember: Array<Team>;
  categorys: Array<Category>;
  groups: Array<Group>
  catDetails: Array<CategoryDetails>
  selectedMembers: Member;
  arryCat = [];
  constructor(
    private _modelService: BsModalService ,
    private _memberService: MemberService ,
    private _categoryServie: CategoryService,
    private _teamService: TeamService,
    private _toasterService: ToasterService) { }

  ngOnInit() {
    this.getMembers();
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
  setValue(evnt, data) {
    // console.log(evnt);
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
  fileChangeListener(event: any) {
    this.fileList = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ( event: any) => {
        this.data = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  submitNewMember(member: Member) {
    if (this.fileList.length > 0) {
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('name', member.name);
      formData.append('mob', member.mob);
      formData.append('email', member.email);
      formData.append('telegram', member.telegram);
      formData.append('place', member.place);
      for (var i = 0; i < this.arryCat.length; i++) {
        formData.append('group', this.arryCat[i]);
      }
      this._memberService.addmbers(formData, this.arryCat)
        .subscribe(resNewTeam => {
          if (resNewTeam.status === 200) {
            this._toasterService.Success(resNewTeam.message);
            this.modalRef.hide();
            this.getMembers();
            this.fileList = null;
          } else {
            this._toasterService.Warning(resNewTeam.message);
          }

        });
    } else {
      this._toasterService.Warning('Warning', 'Please select image');
    }
    // member.group = this.arryCat;
    // this._memberService.addmbers(member)
    //   .subscribe(resNewMember => {
    //     this.modalRef.hide();
    //     console.log('Success');
    //   });
  }
  getMembers() {
    this._memberService.getMembbers()
      .subscribe(resMember => this.members = resMember);
  }
  inactive(member_id) {
    this._memberService.statusMembers(member_id, false)
      .subscribe(resStatus => {
        if (resStatus.status === 200) {
          this._toasterService.Success(resStatus.message);
          this.getMembers();
        } else {
          this._toasterService.Warning(resStatus.message);
        }

      });
  }
  active(member_id) {
    this._memberService.statusMembers(member_id, true)
      .subscribe(resStatus => {
        if (resStatus.status === 200) {
          this._toasterService.Success(resStatus.message);
          this.getMembers();
        } else {
          this._toasterService.Warning(resStatus.message);
        }

      });
  }
  delete(member_id) {

  }
  memberDetails(id) {
    this._memberService.getIntividualMember(id)
      .subscribe(resTeamDeatails => this.testMember = resTeamDeatails);
    console.log(this.testMember);
  }
  editOpenModal(template: TemplateRef<any>, id) {
    // console.log('id :' + id);
    // this.name = this.member.name;
    this.memberDetails(id);
    this.modalRef = this._modelService.show(template);

    // this.name = this.member.name;
    // console.log(this.members);
    this.getTeamDetails();
  }

}
