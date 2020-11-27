import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SessionData } from './models/sessionData.mode';
import { LoginCredential } from './models/loginCredential.model';
import { LoginResponse } from './models/loginResponse.model';
import { UserRegistrationModel } from './models/userRegistration.model';

@Injectable({
  providedIn: 'any'
})
export class AuthenticationApiService {

  private userList: {
    [email: string]: {
      name: string,
      email: string,
      token: string,
      password: string,
    }
  } = {
    'user1@test.com': {
      name: 'user 1',
      email: 'user1@test.com',
      token: 'user 1 token',
      password: '123456',
    },
    'user2@test.com': {
      name: 'user 2',
      email: 'user2@test.com',
      token: 'user 2 token',
      password: '123456',
    },
    'user3@test.com': {
      name: 'user 3',
      email: 'user3@test.com',
      token: 'user 3 token',
      password: '123456',
    },
    'user4@test.com': {
      name: 'user 4',
      email: 'user4@test.com',
      token: 'user 4 token',
      password: '123456',
    }
  };

  private staffList: {
    [email: string]: {
      name: string,
      email: string,
      token: string,
      password: string,
      role: string,
    }
  } = {
    'staff1@test.com': {
      name: 'staff 1',
      email: 'staff1@test.com',
      token: 'staff 1 token',
      password: '123456',
      role: 'admin'
    },
    'staff2@test.com': {
      name: 'staff 2',
      email: 'staff2@test.com',
      token: 'staff 2 token',
      password: '123456',
      role: 'staff'
    }
  };

  constructor() { }

  getUserAuthStatus(): SessionData | null {
    const serial_user_app_data = sessionStorage.getItem('user_app_data');

    if (!serial_user_app_data) {
      return null;
    }

    try {
      const json_user_app_data: SessionData = JSON.parse(serial_user_app_data);
      return json_user_app_data;
    } catch (err) {
      console.log('auth-api service', 'Error : ', err);
      return null;
    }
  }

  loginUser(credentials: LoginCredential): Observable<LoginResponse> {
    try {
      const userFromEmail = this.userList[credentials.email];
      if (userFromEmail == null) {
        throw new Error('Invalid User email or password');
      }

      const isValidPassword = credentials.password == userFromEmail.password;
      if (!isValidPassword) {
        throw new Error('Invalid User email or password');
      }

      const json_user_app_data: SessionData = {
        name: userFromEmail.name,
        email: userFromEmail.email,
        token: userFromEmail.token,
        role: 'user'
      };

      sessionStorage.setItem('user_app_data', JSON.stringify(json_user_app_data));

      return of({
        success: true,
        data: {
          name: userFromEmail.name,
          email: userFromEmail.email ,
          role: 'user',
          token: userFromEmail.token,
        },
        error: null
      }).pipe(delay(2000));
    } catch (err) {
      return of({
        success: false,
        data: null,
        error: err
      }).pipe(delay(2000));
    }
  }

  loginStaff(credentials: LoginCredential): Observable<LoginResponse> {
    try {
      const userFromEmail = this.staffList[credentials.email];
      if (!userFromEmail) {
        throw new Error('Invalid User email or password');
      }

      const isValidPassword = credentials.password == userFromEmail.password;
      if (!isValidPassword) {
        throw new Error('Invalid User email or password');
      }

      const json_user_app_data: SessionData = {
        name: userFromEmail.name,
        email: userFromEmail.email,
        token: userFromEmail.token,
        role: userFromEmail.role
      };

      sessionStorage.setItem('user_app_data', JSON.stringify(json_user_app_data));

      return of({
        success: true,
        data: {
          name: userFromEmail.name,
          email: userFromEmail.email ,
          role: userFromEmail.role,
          token: userFromEmail.token,
        },
        error: null
      }).pipe(delay(2000));
    } catch (err) {
      return of({
        success: false,
        data: null,
        error: err
      }).pipe(delay(2000));
    }
  }

  registerUser(data: UserRegistrationModel): Observable<LoginResponse> {
    try {
      const userFromList = this.userList[data.email];
      if (userFromList) {
        throw new Error('Email already exists');
      }

      this.userList[data.email] = {
        name: data.name,
        email: data.email,
        token: data.name + ' token',
        password: data.password
      };

      const json_user_app_data: SessionData = {
        name: data.name,
        email: data.email,
        token: data.name + ' token',
        role: 'user',
      };

      sessionStorage.setItem('user_app_data', JSON.stringify(json_user_app_data));

      return of({
        success: true,
        data: {
          name: this.userList[data.email].name,
          email: this.userList[data.email].email ,
          role: 'user',
          token: this.userList[data.email].token,
        },
        error: null
      }).pipe(delay(2000));
    } catch (err) {
      return of({
        success: false,
        data: null,
        error: err
      }).pipe(delay(2000));
    }
  }

  logoutUser(): boolean {
    // clear session
    sessionStorage.clear();
    return true;
  }
}
