import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  private token: string = '';
  public form: FormGroup;
  public notEqual: boolean = false;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private commonService: CommonService,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.activeRoute.params.forEach((param) => {
      if (param && param.id) {
        this.token = param.id;
      }
    });
  }
  ngOnDestroy(): void {
    localStorage.removeItem('mnemonic');
    localStorage.removeItem('userEmail');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      confirmPassword: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
    this.form.valueChanges.subscribe(() => {
      this.checkValidatity();
    });
  }

  /**
   * @method navigateToPoint
   * @param route: string
   * @description this method navigates to the account module
   */
  public navigateToPoint(route: string) {
    this.router.navigate([route]);
  }

  /**
   * @method checkValidatity
   * @description this method checks for password validity
   */
  public checkValidatity(submit?: any) {
    if (submit) {
      this.form.controls.confirmPassword.markAsDirty();
    }
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.notEqual = true;
    } else {
      this.notEqual = false;
    }
  }
  /**
   *  onSubmit
   */
  public onSubmit() {
    console.log('form submit ====>', this.form);
    if(this.formControl.confirmPassword.value !== this.formControl.password.value){
      return
    }
    if (this.form.valid) {
      if (this.token === '1') {
        const body = {
          mnemonic_pass_phrase: localStorage.getItem('mnemonic'),
          email: localStorage.getItem('userEmail'),
          password: this.formControl.password.value,
        };
        this.api
          .httpPost('user/forgetpasswordupdate', body)
          .subscribe((response: any) => {
            this.commonService.hideSpinner();
            if (response && response.code === 200) {
              this.commonService.successToast(
                'success',
                'Password set Successfully!'
              );
              this.router.navigate(['/signin']);
            } else {
              this.commonService.failureToast('Error', response.message);
            }
          });
      } else {
        const body = {
          user_verification_token: this.token,
          password: this.formControl.password.value,
        };
        this.api
          .httpPost('user/usertokenverification', body)
          .subscribe((response: any) => {
            this.commonService.hideSpinner();
            if (response && response.code === 200) {
              this.commonService.successToast(
                'success',
                'Password set Successfully!'
              );
              this.router.navigate(['/signin']);
            } else {
              this.commonService.failureToast('Error', response.message);
            }
          });
      }
    }
  }

  get formControl() {
    return this.form.controls;
  }
}
