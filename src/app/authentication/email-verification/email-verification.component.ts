import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  public username: any = 'User';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username')?.toString();
    }
  }
  /**
   * @method navigateToPoint
   * @param route: string
   * @description this method navigates to the account module
   */
  public navigateToPoint(route: string) {
    this.router.navigate([route]);
  }
}
