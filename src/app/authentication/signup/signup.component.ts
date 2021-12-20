import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public ddpValues: any[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) {
    this.form = this.fb.group({
      name: ['', { validators: [Validators.required] }],
      username: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required] }],
      identification_number: ['', { validators: [Validators.required] }],
      identification_type: ['', { validators: [Validators.required] }],
      mobile_number: ['', { validators: [Validators.required] }],
      dob: ['', { validators: [Validators.required] }],
      gender: ['', { validators: [Validators.required] }],
      country: ['', { validators: [Validators.required] }],
      referral_id: ['', { validators: [Validators.required] }],
      mnemonic_pass_phrase: [''],
    });
    this.getCountries();
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

  /**
   * getCountries
   */
  public getCountries() {
    this.api.httpGet('countries').subscribe((response: any) => {
      console.log('response ===>', response);
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.ddpValues = response.data;
      }
    });
  }

  /*   public onSubmit() {
    this.api.httpGet('user/mnemonics').subscribe((response: any) => {
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        console.log('mnemonic_pass_phrase ====>', response.data);
        this.form.patchValue({
          mnemonic_pass_phrase: response.data,
        });
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
    });
  } */

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
