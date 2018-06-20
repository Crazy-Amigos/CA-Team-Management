import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import {CdkTableModule} from '@angular/cdk/table';

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
import { MembersComponent } from './members/members.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ToasterService} from './toaster.service';
import { CategoryComponent } from './group/category/category.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TeamComponent } from './team/team.component';
import { RegiisterComponent } from './regiister/regiister.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthService} from './auth/auth.service';
// import {ToastModule} from 'ng2-toastr';
// import {Observable} from 'rxjs';
export function tokenGetter() {
  return localStorage.getItem('mean-token');
}

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
    GroupComponent,
    MembersComponent,
    CategoryComponent,
    TeamComponent,
    RegiisterComponent
  ],
  imports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    })
    // ToastModule.forRoot()
    // Observable
  ],
  providers: [ToasterService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
