import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { EmailVerificationComponent } from './authentication/email-verification/email-verification.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { SetPasswordComponent } from './authentication/set-password/set-password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [
  {
    path: '',
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
