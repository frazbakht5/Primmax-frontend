import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { console.log('token', localStorage.getItem('primmax-accesstoken')) }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('primmax-accesstoken')) { // determine if the uder is logged in from this method.
            return true;
        }
        if(localStorage.getItem('isAdmin') == 'true') {
            this.router.navigate(['admin/login']);
            return true
        }else{
            this.router.navigate(['/signin']);
            return true;
        }
        return false;
    }
}