import {Component, OnInit, TemplateRef , ElementRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Team} from '../variable/team';
import {TeamService} from '../team.service';
import {ToasterService} from '../toaster.service';
import {Group} from '../variable/group';
import { Http, Response , RequestOptions } from '@angular/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Location } from '@angular/common';
const URL = '/amigosApi/teams/';
// import the do function to be used with the http library.
// import 'rxjs/add/operator/do';
// import the map function to be used with the http library
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  fileList: FileList ;
  team_name;
  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  _id;
  groupName;
  teams: Array<Team>;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private _toasterService: ToasterService,
    private _teamService: TeamService ,
    private http: Http,
    private el: ElementRef,
    private location: Location) { }

  ngOnInit() {
    // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
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
  fileChangeEvent(event) {
    this.fileList = event.target.files;
    console.log(this.fileList);
  }
  newGroup(group: Group, teamName) {
    // console.log(this.fileList);
    if ( this.fileList.length > 0) {
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('name', group.name);
      this._teamService.addNewGroup(formData, teamName)
        .subscribe(resNewTeam => {
          if (resNewTeam.status === 200) {
            this._toasterService.Success(resNewTeam.message);
            this.modalRef.hide();
            this.getTeam();
            this.fileList = null ;
          } else {
            this._toasterService.Warning(resNewTeam.message);
          }

        });
    } else {
      this._toasterService.Warning( 'Please select image');
    }
  }
  deleteGroup(_id) {
    if (confirm('do you wante delete Selected Group') === true) {
      this._teamService.deleteGroup(_id)
        .subscribe(resNewTeam => {
          if (resNewTeam.status === 200) {
            this._toasterService.Success(resNewTeam.message);
            // this.modalRef.hide();
            location.reload();
            this.fileList = null ;
          } else {
            this._toasterService.Warning(resNewTeam.message);
          }

        });
    } else {
      this._toasterService.Warning('Delete');
    }

  }
  editOpenModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    this.groupDetails(id);
    // this.getTeamDetails();
  }
  groupDetails(_id) {
    this._teamService.getGroup(_id)
      .subscribe(resFromServer => {
        // console.log(resFromServer[0]);
        this.setValue(resFromServer._id, resFromServer.name , resFromServer.team);
      });
  }
  setValue(id, name , team_name) {
    this._id = id;
    this.groupName = name;
    this.team_name = team_name;
  }
  updateGroupIcon(group: Group, teamName) {
    // console.log(this.fileList);
    if ( this.fileList.length > 0) {
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('name', group.name);
      formData.append('team', teamName);
      this._teamService.updateGroupIcon(formData, group._id)
        .subscribe(resNewTeam => {
          if (resNewTeam.status === 200) {
            this._toasterService.Success(resNewTeam.message);
            this.modalRef.hide();
            location.reload();
            this.fileList = null ;
          } else {
            this._toasterService.Warning(resNewTeam.message);
          }

        });
    } else {
      this._toasterService.Warning( 'Please select image');
    }
  }
  deleteTeam(team) {
    if (confirm('do you wante delete Selected Group') === true) {
      this._teamService.deleteTeam(team)
        .subscribe(resNewTeam => {
          if (resNewTeam.status === 200) {
            this._toasterService.Success(resNewTeam.message);
            // this.modalRef.hide();
            location.reload();
            this.fileList = null ;
          } else {
            this._toasterService.Warning(resNewTeam.message);
          }

        });
    } else {
      this._toasterService.Warning('Delete');
    }
  }
}
