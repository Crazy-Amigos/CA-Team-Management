import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {MemberService} from '../member.service';
import { Member} from '../variable/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements OnInit {
  modalRef: BsModalRef;
  members: Array<Member>;
  selectedMembers: Member;
  constructor(private _modelService: BsModalService , private _memberService: MemberService) { }

  ngOnInit() {
    this.getMembers();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modelService.show(template);
  }
  closeModel() {
    this.modalRef.hide();
  }
  submitNewMember(member: Member) {
    this._memberService.addmbers(member)
      .subscribe(resNewMember => {
        this.modalRef.hide();
        this.getMembers();
        console.log('Success');
      });
  }
  getMembers() {
    this._memberService.getMembers()
      .subscribe(resMemberDate => this.members = resMemberDate );
  }

}
