import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Team} from './variable/team';
import {map} from 'rxjs/internal/operators';
import {Group} from './variable/group';

@Injectable()
export class TeamService {
  private _objServer = 'http://localhost:3000';
  private _postUrl = this._objServer + '/amigosApi/teams/';
  private _getUrl = this._objServer + '/amigosApi/teams/'
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
  addNewGroup(formdata, teamName, files) {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const option = new RequestOptions({headers: headers});
    console.log(files);
    return this._http.post(this._postUrl + teamName, files , option )
      .pipe(map((response: Response) => response.json()));
  }

}
