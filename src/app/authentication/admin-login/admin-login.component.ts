import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  public form: FormGroup;
  public submitted: Boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) {
    console.log(
      "localStorage.getItem('access-token')",
      localStorage.getItem('primmax-accesstoken')
    );
    if (localStorage.getItem('primmax-accesstoken')) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    // this.commonService.successToast("sdfsdf","sdfsdf")
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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
  public onSubmit() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.api
        .httpPost('user/adminlogin', this.form.value)
        .subscribe((response: any) => {
          this.commonService.hideSpinner();
          if (response && response.code === 200) {
            localStorage.setItem(
              'primmax-accesstoken',
              response.data.accessToken
            );
            localStorage.setItem('isAdmin', 'true');
            this.router.navigate(['/userbalance']);
          } else {
            this.commonService.failureToast('error', response.message);
          }
        });
    }
  }
  get formControl() {
    return this.form.controls;
  }
}
