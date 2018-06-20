import { Component, OnInit } from '@angular/core';
import {AuthService, TokenPayload} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ToasterService} from '../toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router , private _toasterService: ToasterService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/');
      // this.router.navigate(['login']);
      this._toasterService.Success('Success', 'Login Successflly');
    }, (err) => {
      // alert('Error');
      this._toasterService.Error('User or Password invalid');
    });
  }


}
