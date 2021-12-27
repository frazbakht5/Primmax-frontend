import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public isEdit = false;
  public isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      mnemonic_pass_phrase: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      name: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      username: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      identification_number: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      gender: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      dob: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      country: [
        { value: '', disabled: true },
        { validators: [Validators.required] },
      ],
      mobile_number: ['', { validators: [Validators.required] }],
      home_address: ['', { validators: [Validators.required] }],
    });
    this.pathvalues();
    this.form.valueChanges.subscribe(() => {
      this.isEdit = true;
    });
  }
  /**
   * logout
   */
  public async logout() {
    if (localStorage.getItem('isAdmin') == 'true') {
      // await this.api.httpPut('user/adminlogout', {}).subscribe((data) => {
      this.router.navigate(['admin/login']);
      localStorage.removeItem('primmax-accesstoken');
      return;
      // });
    } else {
      // await this.api.httpPut('user/logout', {}).subscribe((data) => {
      this.router.navigate(['/signin']);
      localStorage.removeItem('primmax-accesstoken');
      return;
      // });
    }
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    const body = {
      mobile_number: this.formControl.mobile_number.value,
      home_address: this.formControl.home_address.value,
    };
    this.api.httpPut('user', body).subscribe((response: any) => {
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.commonService.successToast(
          'success',
          'Record updated successfully'
        );
        this.pathvalues();
      } else {
        this.commonService.failureToast('Error', response.message);
      }
    });
  }
  get formControl() {
    return this.form.controls;
  }
  /**
   * pathvalues
   */
  public pathvalues() {
    this.api.httpGet('user').subscribe((response: any) => {
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.form.patchValue({
          email: response.data.email,
          mnemonic_pass_phrase: response.data.mnemonic_pass_phrase,
          name: response.data.name,
          username: response.data.username,
          identification_number: response.data.identification_number,
          gender: response.data.gender,
          dob: moment(response.data.dob).format('MM/DD/YYYY'),
          country: response.data.country,
          mobile_number: response.data.mobile_number,
          home_address: response.data.home_address,
        });
      }
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


  public userbalance() {
    this.router.navigate(['/userbalance']);
  }

  public kyc() {
    this.router.navigate(['/kyc']);
  }
  public buyprimm() {
    this.router.navigate(['/user/buyprimm']);
  }
}
