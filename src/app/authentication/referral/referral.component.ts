import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import * as AWS from 'aws-sdk';
import { environment } from '../../../environments/environment';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
//  interface ReferralNode {
//   name: string;
//   children?: ReferralNode[];
// }

const TREE_DATA = [
  {
    value: {
      name: 'Fruit'
    },
    children: [
      {value: {name: 'Apple'}},
      {value: {name: 'Banana'}},
      {value: {name: 'Fruit loops'}},
    ]
  }, {
    value: {
      name: 'Vegetables',
    },
    children: [
      {
        value: {
          name: 'Green',
        },
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        value: {
          name: 'Orange',
        },
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  public isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) { 

    this.api.httpGet('user/referraltree').toPromise().then((response: any) => {
      console.log('response ===>', response.data);
      this.commonService.hideSpinner();
      if (response && response.code === 200) {
        this.dataSource.data = [response.data];
      }
    });
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

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
}
