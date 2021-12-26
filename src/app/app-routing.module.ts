import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/guards/login.guard';
import { AdminLoginComponent } from './authentication/admin-login/admin-login.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { EmailVerificationComponent } from './authentication/email-verification/email-verification.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { KycComponent } from './authentication/kyc/kyc.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { SetPasswordComponent } from './authentication/set-password/set-password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { UserBalanceComponent } from './authentication/userbalance/userbalance.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'setpassword/:id',
    component: SetPasswordComponent,
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
  },

  {
    path: 'verification',
    component: EmailVerificationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'userbalance',
    component: UserBalanceComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'landingpage',
    component: LandingpageComponent,
  },
  {
    path: 'kyc',
    component: KycComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin/profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
