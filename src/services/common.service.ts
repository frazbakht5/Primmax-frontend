import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    public ngxSpinner: NgxSpinnerService,
    public tost: ToastrService
  ) {}

  /**
   * @method showSpinner
   * @param url
   * @description this method uses http get
   */
  public showSpinner() {
    this.ngxSpinner.show();
  }

  /**
   * @method hideSpinner
   * @param url
   * @description this method uses http get
   */
  public hideSpinner() {
    this.ngxSpinner.hide();
  }

  /**
   * @method successToast
   * @param url
   * @description this method uses http get
   */
  public successToast(title: string, message: string) {
    this.tost.success(message, title);
  }

  /**
   * @method hideSpinner
   * @param url
   * @description this method uses http get
   */
  public failureToast(title: string, message: string) {
    this.tost.error(title, message);
  }
}
