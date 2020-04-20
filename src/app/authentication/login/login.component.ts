import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredential } from '../models/loginCredential.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../models/authState.model';
import { initiateUserLogin } from '../store';
import { getUserLoadingStatus } from '../store/authentication/authentication.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserAuthLoading$: Observable<boolean>;

  constructor(private store: Store<AuthState>, private router: Router) { }

  ngOnInit(): void {
    this.isUserAuthLoading$ = this.store.select(getUserLoadingStatus);
  }

  login(event : {loginType: string, data: LoginCredential}) {
    console.log("submitted");
    this.store.dispatch(initiateUserLogin({
      loginType: event.loginType,
      payload: event.data
    }));
  }

  goToRegister() {
    this.router.navigateByUrl("/auth/register");
  }

}
