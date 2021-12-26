import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})
export class KycComponent implements OnInit {
  public form: FormGroup;
  public isApproved = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) {
    this.getUserDetail();
  }

  ngOnInit(): void {}
  /**
   * @method navigateToPoint
   * @param route: string
   * @description this method navigates to the account module
   */
  public navigateToPoint(route: string) {
    this.router.navigate([route]);
  }

  public async logout() {
    if (localStorage.getItem('isAdmin') == 'true') {
    //   await this.api.httpPut('user/adminlogout', {}).subscribe((data) => {
        this.router.navigate(['admin/login']);
        localStorage.removeItem('primmax-accesstoken');
        return;
    //   });
    } else {
    //   await this.api.httpPut('user/logout', {}).subscribe((data) => {
        this.router.navigate(['/signin']);
        localStorage.removeItem('primmax-accesstoken');
        return;
    //   });
    }
  }

  public userbalance() {
    this.router.navigate(['/userbalance']);
  }
  public kyc() {
    this.router.navigate(['/kyc']);
  }
  public getUserDetail() {
    this.api.httpGet('user').subscribe((response: any) => {
      console.log('response ===>', response);
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.isApproved =
          response.data.is_identification_picture_with_selfie_verified;
      }
    });
  }
  public update() {}

  public onSubmit() {
    if (this.form.valid) {
      console.log('form values ===>', this.form.value);
      localStorage.setItem('username', this.formControl.username.value);
      this.api
        .httpPost('user/signup', this.form.value)
        .subscribe((response: any) => {
          this.commonService.hideSpinner();
          if (response && response.code === 200) {
            this.commonService.successToast(
              'success',
              'Email Sent Successfully!'
            );
            this.router.navigate(['/verification']);
          } else {
            this.commonService.failureToast('Error', response.message);
          }
        });
    }
  }

  get formControl() {
    return this.form.controls;
  }
}
