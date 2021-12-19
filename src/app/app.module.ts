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


@NgModule({
  declarations: [
    AppComponent,
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
    NgxSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

// DB_DATABASE='primmax'
// DB_USERNAME='postgres'
// DB_PASSWORD='123'
// DB_HOST='localhost'
// DB_DIALECT='postgres'