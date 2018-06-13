import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Team} from '../variable/team';
import {TeamService} from '../team.service';
import {ToasterService} from '../toaster.service';
import {Group} from '../variable/group';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  filesToUpload: File;
  team_name;
  teams: Array<Team>
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private _toasterService: ToasterService, private _teamService: TeamService) { }

  ngOnInit() {
    this.getTeam();
  }
  openModal(template: TemplateRef<any>, team) {
    this.modalRef = this.modalService.show(template);
    this.team_name = team;
  }
  closeModel() {
    this.modalRef.hide();
  }
  newTeam(team: Team) {
    this._teamService.addNewTeam(team)
      .subscribe(resNewTeam => {
        if (resNewTeam.status === 200) {
          this._toasterService.Success(resNewTeam.message);
          this.modalRef.hide();
          this.getTeam();
        } else {
          this._toasterService.Warning(resNewTeam.message);
        }

      });
  }
  getTeam() {
    this._teamService.getTeam()
      .subscribe(resTeam => this.teams = resTeam );
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput;
  }
  newGroup(formdata, teamName) {
    // group.files = this.filesToUpload;
    // console.log( 'file :' + this.filesToUpload);
    // console.log(group.files);
    this._teamService.addNewGroup(formdata, teamName, this.filesToUpload )
      .subscribe(resNewGroup => {
        if (resNewGroup.status === 200) {
          this._toasterService.Success(resNewGroup.message);
          this.modalRef.hide();
          // this.getTeam();
        } else {
          this._toasterService.Warning(resNewGroup.message);
        }

      });
  }


}
