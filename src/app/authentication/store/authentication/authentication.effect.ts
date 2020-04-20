import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as authenticationAction from './authentication.action';
import { map, catchError, concatMap, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EMPTY, iif } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '../../models/authState.model';
import { AuthenticationApiService } from '../../authentication-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationEffects {
    constructor(private actions$: Actions, private authService: AuthenticationApiService, private store: Store<AuthState>, private router: Router) {}

    @Effect({ dispatch: false })
    initiateLogin = this.actions$.pipe(
        ofType(authenticationAction.initiateUserLogin),
        tap((data) => console.log("test", data)),
        // take(1),
        tap(() => {
            console.log("loading");
            this.store.dispatch(authenticationAction.loadingUserLogin());
        }),
        concatMap(payload => {
            return iif(
                () => payload.loginType == 'user', 
                this.authService.loginUser(payload.payload),
                this.authService.loginStaff(payload.payload)
                )
                .pipe(
                    map(response => {
                        if(!response.success) {                          
                            throw response.error;
                        }
                        this.store.dispatch(authenticationAction.loginUserSuccess({ token: response.data.token, name: response.data.name, }));
                    }),
                    catchError(error => {
                        this.store.dispatch(authenticationAction.loginUserFail({ errorMessage: error }))
                        alert(error);
                        return EMPTY
                    }),
                )
        })
    );

    @Effect({ dispatch: false })
    successLogin = this.actions$.pipe(
        ofType(authenticationAction.loginUserSuccess),
        tap(() => {
            console.log("success");            
            this.router.navigateByUrl('/auth/register');
        })
    );

    @Effect({ dispatch: false })
    initiateRegistration = this.actions$.pipe(
        ofType(authenticationAction.initiateUserRegistration),
        take(1),
        tap(() => {
            console.log("loading");
            this.store.dispatch(authenticationAction.loadingUserLogin());
        }),
        concatMap(payload => {
            return this.authService.registerUser(payload.payload)
                .pipe(
                    map(response => {
                        if(!response.success) {                          
                            throw response.error;
                        }
                        this.store.dispatch(authenticationAction.registerUserSuccess());
                    }),
                    catchError(error => {
                        this.store.dispatch(authenticationAction.loginUserFail({ errorMessage: error }))
                        alert(error);
                        return EMPTY
                    }),
                )
        })
    );

    @Effect({ dispatch: false })
    successRegistration = this.actions$.pipe(
        ofType(authenticationAction.registerUserSuccess),
        tap(() => {
            console.log("success");            
            this.router.navigateByUrl('/auth/login');
        })
    );
}