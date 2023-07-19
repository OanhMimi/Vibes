import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadsComponent } from './components/reads/reads.component';
import { ThoughtsComponent } from './components/thoughts/thoughts.component';
import { HabitsComponent } from './components/habits/habits.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


const routes: Routes = [
  { path: '', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'habits', 
  component: HabitsComponent, canActivate: [AuthGuard]},
  { path: 'thoughts', component: ThoughtsComponent, canActivate: [AuthGuard]},
  { path: 'reads', component: ReadsComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'welcome', component: WelcomePageComponent }
  // { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
