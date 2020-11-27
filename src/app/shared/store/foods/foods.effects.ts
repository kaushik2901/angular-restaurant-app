import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as foodsAction from './foods.action';
import { map, catchError, concatMap, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EMPTY, iif } from 'rxjs';
import { Router } from '@angular/router';
import { FoodState } from '../../../user/models/foodState';
import { FoodApiService } from '../../food-api.service';

@Injectable({
    providedIn: 'any'
})
export class FoodsEffects {
    constructor(private actions$: Actions, private store: Store<FoodState>, private router: Router, private foodsApi: FoodApiService) {}

    @Effect({ dispatch: false })
    initiateLogin = this.actions$.pipe(
        ofType(foodsAction.loadFoods),
        take(1),
        tap(() => {
            console.log('loading');
            this.store.dispatch(foodsAction.foodLoading());
        }),
        concatMap(() => {
            return this.foodsApi.getFoods()
                .pipe(
                    map(response => {
                        if (!response.success) {
                            throw response.error;
                        }
                        this.store.dispatch(foodsAction.loadFoodsSuccess({
                            foods: response.data.foods,
                            categories: response.data.categories,
                        }));
                    }),
                    catchError(error => {
                        this.store.dispatch(foodsAction.loadFoodsError({ errorMessage: error }));
                        alert(error);
                        return EMPTY;
                    }),
                );
        }),
    );
}
