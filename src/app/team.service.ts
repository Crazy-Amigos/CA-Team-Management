import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Team} from './variable/team';
import {map} from 'rxjs/internal/operators';
import {Group} from './variable/group';

@Injectable()
export class TeamService {
  private _objServer = 'http://localhost:3000';
  private _postUrl = '/amigosApi/teams/';
  private _getUrl = '/amigosApi/teams/';
  private _groupUrl = '/amigosApi/groups/'
  constructor(private _http: Http) { }
  addNewTeam(team: Team) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const option = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(team), option)
      .pipe(map((response: Response) => response.json()));
  }
  getTeam() {
    return this._http.get(this._getUrl)
      .pipe(map((response: Response) => response.json()));
  }
  addNewGroup(formdata, teamName) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._groupUrl + teamName, formdata , options)
      .pipe(map((response: Response) => response.json()));
  }
  deleteGroup(goup_id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._groupUrl + 'delete/' + goup_id , options)
      .pipe(map((response: Response) => response.json()));
  }
  getGroup(id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._groupUrl + 'getGroup/' + id , options)
      .pipe(map((response: Response) => response.json()));
  }
  updateGroupIcon(formdata, _id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._groupUrl + 'doEdit/group/' + _id, formdata , options)
      .pipe(map((response: Response) => response.json()));
  }
  deleteTeam(team) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl + 'delete/' + team , options)
      .pipe(map((response: Response) => response.json()));
  }
}
