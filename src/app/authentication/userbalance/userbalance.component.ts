import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-userbalance',
  templateUrl: './userbalance.component.html',
  styleUrls: ['./userbalance.component.scss'],
})
export class UserBalanceComponent implements OnInit {
  public form: FormGroup;
  public UserData: any = [];
  public userBalance = 0;
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
    // if (localStorage.getItem('primmax-accesstoken')) {
    //     this.router.navigate(['/profile']);
    // }
    this.getUserData();
  }
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

  public userbalance() {
    this.router.navigate(['/userbalance']);
  }

  public profile() {
    this.router.navigate(['admin/profile']);
  }

  changeFn(event: any) {
    this.userBalance = event.target.value;
  }

  getUserData() {
    this.commonService.showSpinner();
    this.api.httpGet('/user/getallusers').subscribe((response: any) => {
      console.log('response', response);
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.UserData = response.data;
        this.commonService.hideSpinner();
      } else {
        this.commonService.failureToast('error', response.message);
        this.commonService.hideSpinner();
      }
    });
  }

  addBalance(row: any) {
    const { id } = row;
    this.commonService.showSpinner();
    this.api
      .httpPost('user/updateuserbalance', {
        id,
        type: 'Add',
        value: Number(this.userBalance),
      })
      .subscribe((response: any) => {
        if (response && response.code === 200) {
          // console.log("🚀 ~ file: userbalance.component.ts ~ line 70 ~ UserBalanceComponent ~ .subscribe ~ response", response)
          const { data } = response;
          let id = data[1][0]?.id;
          let balance = data[1][0]?.balance;
          this.UserData = this.UserData.map((item: any) =>
            this.updateArray(item, id, balance)
          );
          this.commonService.hideSpinner();
        } else {
          this.commonService.failureToast('error', response.message);
          this.commonService.hideSpinner();
        }
      });
  }

  updateArray(p: any, id: any, balance: any) {
    return p.id === id ? { ...p, balance: balance } : p;
  }

  subBalance(row: any) {
    const { id } = row;
    this.commonService.showSpinner();
    this.api
      .httpPost('user/updateuserbalance', {
        id,
        type: 'Subtract',
        value: Number(this.userBalance),
      })
      .subscribe((response: any) => {
        if (response && response.code === 200) {
          const { data } = response;
          let id = data[1][0]?.id;
          let balance = data[1][0]?.balance;
          this.UserData = this.UserData.map((item: any) =>
            this.updateArray(item, id, balance)
          );
          this.commonService.hideSpinner();
        } else {
          this.commonService.failureToast('error', response.message);
          this.commonService.hideSpinner();
        }
      });
  }

  ngOnInit(): void {}
}
