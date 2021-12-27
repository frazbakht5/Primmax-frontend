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
import { UserBalanceComponent } from './userbalance/userbalance.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BuyPrimmComponent } from './buyprimm/buyprimm.component';
import { CryptoWalletComponent } from './cryptowallet/cryptowallet.component';
import { DownloadComponent } from './download/download.component';
import { NewsLetterComponent } from './newsletter/newsletter.component';
import { PrimmWalletComponent } from './primmwallet/primmwallet.component';
import { ReferralComponent } from './referral/referral.component';
import { StakingComponent } from './staking/staking.component';
import { SupportComponent } from './support/support.component';
import { SwapComponent } from './swap/swap.component';


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
    UserBalanceComponent,
    AdminLoginComponent,
    BuyPrimmComponent,
    CryptoWalletComponent,
    DownloadComponent,
    NewsLetterComponent,
    PrimmWalletComponent,
    ReferralComponent,
    StakingComponent,
    SupportComponent,
    SwapComponent
  ],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
})
export class AuthenticationModule { }
