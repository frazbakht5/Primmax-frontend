import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  public notEqual = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      confirmPassword: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
      oldpassword: ['', { validators: [Validators.required] }],
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

  get formControl() {
    return this.form.controls;
  }
  /**
   * onSubmit
   
  {
   "old_password": "test.123",
   "new_password": "test.1234",
   "confirm_password": "test.1234"
}*/
  public onSubmit() {
    if (this.form.valid) {
      const body = {
        old_password: this.formControl.oldpassword.value,
        new_password: this.formControl.password.value,
        confirm_password: this.formControl.confirmPassword.value,
      };

      this.api
        .httpPut('user/changepassword', body)
        .subscribe((response: any) => {
          this.commonService.hideSpinner();
          if (response && response.code === 200) {
            this.commonService.successToast(
              'success',
              'password changed successfully'
            );
            localStorage.clear();
            this.router.navigate(['/signin']);
          } else {
            this.commonService.failureToast('Error', response.message);
            this.router.navigate(['/profile']);
          }
        });
    }
  }
}
