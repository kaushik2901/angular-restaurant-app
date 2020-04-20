import { Injectable } from '@angular/core';
import { data as foods } from './models/foodData3';
import { FoodResponse } from './models/foodResponse';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Food } from './models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {

  private foodData: {
    [_id: string]: Food
  };

  private categories: string[] = [];


  constructor() { 
    this.foodData = foods;
  }


  getFoods(): Observable<FoodResponse> {
    return of({
      success: true,
      data: {
        foods: this.foodData,
        categories: this.categories,
      },
      error: null,
    }).pipe(delay(2000));
  }
}
