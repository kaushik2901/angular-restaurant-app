import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { UserState } from 'src/app/models/userState';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userAction from './user.action';
import { take, tap, concatMap, map, catchError } from 'rxjs/operators';
import { UserApiService } from '../../user-api.service';
import { EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'any'
})
export class UserEffects {
    constructor(private actions$: Actions, private store: Store<UserState>, private router: Router, private userApi: UserApiService) {}

    @Effect({ dispatch: false })
    loadCart = this.actions$.pipe(
        ofType(userAction.loadCart),
        take(1),
        tap(() => {
            console.log("loading");
            this.store.dispatch(userAction.loadingCart());
        }),
        concatMap(() => {
            return this.userApi.getCart()
                .pipe(
                    map(response => {
                        if(!response.success) {                          
                            throw response.error;
                        }
                        this.store.dispatch(userAction.loadCartSuccess({ data: response.data }));
                    }),
                    catchError(error => {
                        this.store.dispatch(userAction.loadCartError({ errorMessage: error }));
                        alert(error);
                        return EMPTY
                    }),
                );
        }),
    );
}