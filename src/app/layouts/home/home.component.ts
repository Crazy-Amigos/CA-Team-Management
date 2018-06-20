import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from '../../auth/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [AuthGuardService]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
