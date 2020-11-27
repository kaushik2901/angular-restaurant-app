import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../models/authState.model';
import { getUserLoadingStatus } from '../store/authentication/authentication.selector';
import { UserRegistrationModel } from '../models/userRegistration.model';
import { initiateUserRegistration } from '../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isUserRegistrationLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.isUserRegistrationLoading$ = this.store.select(getUserLoadingStatus);
  }

  register(data: UserRegistrationModel) {
    console.log('register');
    this.store.dispatch(initiateUserRegistration({
      payload: data
    }));
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
