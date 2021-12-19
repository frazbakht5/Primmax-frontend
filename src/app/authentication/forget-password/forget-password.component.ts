import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mnemonic_pass_phrase: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required] }],
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
   * onSubmit
   */
  public onSubmit() {
    if (this.form.valid) {
      this.api
        .httpPost('user/verifymemonics', this.form.value)
        .subscribe((response: any) => {
          this.commonService.hideSpinner();
          if (response && response.code === 200) {
            this.commonService.successToast('success', 'Mnemonic are matched');
            localStorage.setItem(
              'mnemonic',
              this.form.value.mnemonic_pass_phrase
            );
            localStorage.setItem('userEmail', this.form.value.email);
            this.router.navigate(['/setpassword/1'])
          } else {
            this.commonService.failureToast('Error', 'Invalid Mnemonic');
          }
        });
    }
  }
}
