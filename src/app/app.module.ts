import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RoutingModule} from './routing/routing.module';
import { HomeComponent } from './layouts/home/home.component';
import { LoginlayoutComponent } from './layouts/loginlayout/loginlayout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { GroupComponent } from './group/group.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    LoginlayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
