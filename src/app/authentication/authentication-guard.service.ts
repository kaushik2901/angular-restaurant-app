import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
  providedIn: 'any'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router, private authApiService: AuthenticationApiService) { }

  canActivate(): boolean {
    const user_data = this.authApiService.getUserAuthStatus();
    console.log("user_data", user_data);    

    if(user_data == null) {
      return true;
    }

    if(user_data.role == 'user') {
      this.router.navigateByUrl('/user');
      return false;
    }

    if(user_data.role == 'admin') {
      this.router.navigateByUrl('/admin');
      return false;
    }

    if(user_data.role == 'staff') {
      this.router.navigateByUrl('/staff');
      return false;
    }

    return true;
  }
}
