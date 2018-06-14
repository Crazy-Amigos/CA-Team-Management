import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../layouts/home/home.component';
import {LoginlayoutComponent} from '../layouts/loginlayout/loginlayout.component';
import {GroupComponent} from '../group/group.component';
import {MembersComponent} from '../members/members.component';
import {TeamComponent} from '../team/team.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TeamComponent
      },
      {
        path: 'team',
        component: TeamComponent
      },
      {
        path: 'members',
        component: MembersComponent
      }
    ]
  },
  {
    path: '',
    component: LoginlayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
