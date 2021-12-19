import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerificationComponent,
    ChangePasswordComponent,
    SetPasswordComponent,
  ],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class AuthenticationModule {}
