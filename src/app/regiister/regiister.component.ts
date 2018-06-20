import { Component, OnInit } from '@angular/core';
import {AuthService, TokenPayload} from '../auth/auth.service';
import { Router } from '@angular/router';
import {CategoryService} from '../category.service';
import {TeamService} from '../team.service';
import {MemberService} from '../member.service';
import {ToasterService} from '../toaster.service';

@Component({
  selector: 'app-regiister',
  templateUrl: './regiister.component.html',
  styleUrls: ['./regiister.component.css'],
  providers: [MemberService, CategoryService , TeamService, ToasterService, AuthService]
})
export class RegiisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router, private _toasterService: ToasterService) {
  }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.credentials)
      .subscribe(resNewUser => {
        if (resNewUser.status === 200) {
          this._toasterService.Success(resNewUser.message);
        } else {
          this._toasterService.Warning(resNewUser.message);
        }
      });
  }
}
