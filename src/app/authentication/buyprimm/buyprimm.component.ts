import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'buyprimm',
  templateUrl: './buyprimm.component.html',
  styleUrls: ['./buyprimm.component.scss'],
})
export class BuyPrimmComponent implements OnInit {
  public isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) { }

  ngOnInit(): void { }
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
  public buyprimm() {
    this.router.navigate(['/user/buyprimm']);
  }
  public cryptowalet() {
    this.router.navigate(['/user/cryptowalet']);
  }
  public download() {
    this.router.navigate(['/user/download']);
  }
  public newsletter() {
    this.router.navigate(['/user/newsletter']);
  }
  public primmwallet() {
    this.router.navigate(['/user/primmwallet']);
  }
  public referral() {
    this.router.navigate(['/user/referral']);
  }
  public staking() {
    this.router.navigate(['/user/staking']);
  }
  public support() {
    this.router.navigate(['/user/support']);
  }
  public swap() {
    this.router.navigate(['/user/swap']);
  }


  public onSubmit() { }

  // get formControl() {
  //   return this.form.controls;
  // }
}
