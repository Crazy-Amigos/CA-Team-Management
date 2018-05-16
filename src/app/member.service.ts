import { Injectable } from '@angular/core';
import {Http, HttpModule , Response, Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {Member} from './variable/member';
import {pipe} from 'rxjs';
import {map} from 'rxjs/internal/operators';


@Injectable ()
export class MemberService {
  private _postUrl = '/amigosApi/mem/member'

  constructor(private _http: Http) { }

  addMelmbers(member: Member) {
    console.log(member);
    const headers = new Headers({'Content-Type': 'application/json'});
    const option = new RequestOptions({headers: headers});
    return this._http.post(this._postUrl, JSON.stringify(member), option)
      .pipe(map((response: Response) => response.json()));
  }
}