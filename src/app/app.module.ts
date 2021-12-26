import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ApiInterceptor } from 'src/shared/interceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { KycComponent } from './authentication/kyc/kyc.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginGuard } from 'src/guards/login.guard';
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    KycComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    AppRoutingModule,
    AuthenticationModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: LoginGuard, useClass: LoginGuard }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

// DB_DATABASE='primmax'
// DB_USERNAME='postgres'
// DB_PASSWORD='123'
// DB_HOST='localhost'
// DB_DIALECT='postgres'