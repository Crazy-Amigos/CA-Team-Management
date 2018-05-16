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
  constructor(private _modelService: BsModalService , private _memberService: MemberService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modelService.show(template);
  }
  closeModel() {
    this.modalRef.hide();
  }
  submitNewMember(member: Member) {
    alert(member);
    //console.log(member);
    this._memberService.addMelmbers(member)
      .subscribe(resNewMember => {
        // this.members.push(resNewMember);
        console.log('Success');
      });
  }

}
