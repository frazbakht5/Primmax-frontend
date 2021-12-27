import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import * as fs from 'fs';
@Component({
  selector: 'kyc',
  templateUrl: './primmwallet.component.html',
  styleUrls: ['./primmwallet.component.scss'],
})
export class PrimmWalletComponent implements OnInit {
  public form: FormGroup;
  public isApproved = false;
  selectedFileSrc: any;
  selectedFileSrcSelfie: any;
  imageFileIsTooBig: boolean;
  uploadImageLabel: string;
  selectedFile: ImageSnippet;
  selectedFileSelfie: ImageSnippet;
  NICImage: File;
  SelfieImage: File;
  public isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiService
  ) {
    AWS.config.update({
      accessKeyId: environment.S3PicturesAccessKey,
      secretAccessKey: environment.S3PicturesSecretKey,
      region: environment.region,
    });
    this.getUserDetail();
  }

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

  async uploadSelfie() {
    const reader = new FileReader();
    return new Promise<any>((resolve, reject) => {
      reader.addEventListener('load', async (event: any) => {
        console.log('event.target.result', event.target);
        this.selectedFileSrcSelfie = event.target.result;
        let userId = localStorage.getItem('userId');
        let ext = this.SelfieImage.type.split('/');
        let fileNameId = '' + userId + '-selfie.' + ext[1];
        const s3 = new AWS.S3();
        this.selectedFileSelfie = new ImageSnippet(
          this.selectedFileSrcSelfie,
          this.SelfieImage
        );
        await s3
          .upload({
            Bucket: 'primmax-data',
            Key: `KYC/${userId}/${fileNameId}`,
            Body: this.selectedFileSelfie.file,
            ContentType: 'image/jpeg',
          })
          .promise();
        resolve(1);
      });
      reader.readAsDataURL(this.SelfieImage);
    })
  }

  async uploadNIC() {
    const reader = new FileReader();
    return new Promise<any>((resolve, reject) => {
      reader.addEventListener('load', async (event: any) => {
        console.log('event.target.result', event.target);
        this.selectedFileSrc = event.target.result;
        let userId = localStorage.getItem('userId');
        let ext = this.NICImage.type.split('/');
        let fileNameId = '' + userId + '-id.' + ext[1];
        const s3 = new AWS.S3();
        this.selectedFile = new ImageSnippet(this.selectedFileSrc, this.NICImage);
        await s3
          .upload({
            Bucket: 'primmax-data',
            Key: `KYC/${userId}/${fileNameId}`,
            Body: this.selectedFile.file,
            ContentType: 'image/jpeg',
          })
          .promise();
        resolve(1);
      });
      reader.readAsDataURL(this.NICImage);
    })
  }



  public async update() {
    this.commonService.showSpinner();
    try {
      await this.uploadNIC();
      await this.uploadSelfie();
      this.commonService.hideSpinner();
    } catch (error) {
      this.commonService.hideSpinner();
      this.commonService.failureToast("Upload Error", "Something went wrong while uploading");
    }


  }

  changeImageNIC(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadImageLabel = `${file.name} (${(file.size * 0.000001).toFixed(
      2
    )} MB)`;
    if (file.size > 1048576) {
      this.imageFileIsTooBig = true;
    } else {
      this.imageFileIsTooBig = false;
    }

    this.NICImage = file;
  }

  changeImageSelfie(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadImageLabel = `${file.name} (${(file.size * 0.000001).toFixed(
      2
    )} MB)`;
    if (file.size > 1048576) {
      this.imageFileIsTooBig = true;
    } else {
      this.imageFileIsTooBig = false;
    }

    this.SelfieImage = file;
  }

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

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
