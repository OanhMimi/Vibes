import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReadsComponent } from './components/reads/reads.component';
import { ThoughtsComponent } from './components/thoughts/thoughts.component';
import { HabitsComponent } from './components/habits/habits.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { JournalFormComponent } from './components/thoughts/journal-form/journal-form/journal-form.component';
import { ReusableButtonComponent } from './components/reusable-button/reusable-button.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReadsComponent,
    ThoughtsComponent,
    HabitsComponent,
    PageNotFoundComponent,
    SignupComponent,
    LoginComponent,
    BackdropComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    WelcomePageComponent,
    JournalFormComponent,
    ReusableButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN', // Name of the cookie containing the CSRF token
      headerName: 'X-XSRF-TOKEN'
    }),
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
