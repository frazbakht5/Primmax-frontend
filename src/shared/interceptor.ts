import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private router: Router, private commonService: CommonService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.setHeaders();
    req = req.clone({ headers: this.headers });
    this.commonService.showSpinner();
    return next
      .handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event !== null && event.body.error) {
              if (event.body.error) {
                return event;
              } else {
                this.actionOnError(event.body.error, event.body.message);
                console.log(
                  'error in interceptor ===>',
                  event.body.errr,
                  event.body.message
                );
                return false;
              }
            }
            if (this.router.url !== '/app/account') {
            }
          }
          return event;
        })
      )
      .pipe(
        catchError((error) => {
          this.commonService.hideSpinner()
          this.commonService.failureToast("Error","Network Error")
          console.error(error);
          if (error && error.body) {
            // this.commonService.showErrorToaster(error.body.message, '');
          }
          return of(error);
        }) as any
      );
  }

  /**
   * @method setHeaders
   * @description this method is used to set the headers
   */
  private setHeaders() {
    const access = localStorage.getItem('primmax-accesstoken');
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');

    if (access && access !== '') {
      this.headers = this.headers.append('accesstoken', access);
      console.log('appending', this.headers);
    }
  }

  /**
   * @method actionOnError
   * @description this method used to make necessary action based on error code
   */
  private actionOnError(error: number, message: string) {
    // if (error === 2) {
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    //   this.commonService.showErrorToaster(message, 'Logout');
    // }
    // if (error === 1) {
    //   this.commonService.showErrorToaster(message, 'Error');
    // } else if (error === 5) {
    //   this.commonService.showErrorToaster(message, 'Error');
    // }
  }
}
