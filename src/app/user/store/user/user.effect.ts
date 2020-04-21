import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { UserState } from 'src/app/models/userState';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userAction from './user.action';
import { take, tap, concatMap, map, catchError, mergeMap } from 'rxjs/operators';
import { UserApiService } from '../../user-api.service';
import { EMPTY, combineLatest, of } from 'rxjs';
import { getCartList } from './user.selector';
import { MyCartItem } from '../../models/userState';

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

    // @Effect({ dispatch: false })
    // addToCart = this.actions$.pipe(
    //     ofType(userAction.initAddToCart),
    //     mergeMap((data) => {
    //         return this.store.select(getCartList)
    //         .pipe(
    //             concatMap(cartList => {
                    
    //             })
    //         )
    //     }),
    //     // concatMap(([data, cartList]) => {
    //     //     console.log("cart List", cartList.length, cartList);
    //     //     for (let i = 0; i < cartList.length; i++) {
    //     //         const item = cartList[i];
    //     //         if(this.isBothItemAreEqual(item, data.item)) {
    //     //             console.log("updating old item");                            
    //     //             const newItem = Object.assign({}, item);
    //     //             newItem.quantity = item.quantity + data.item.quantity;
    //     //             this.store.dispatch(userAction.updateCart({ item: newItem }));
    //     //             return null;
    //     //         }
    //     //     }
    //     //     console.log("adding new item");                    
    //     //     this.store.dispatch(userAction.addToCart(data));
    //     //     return null;                    
    //     // }),
    // );
}