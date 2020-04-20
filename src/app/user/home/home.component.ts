import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodState } from '../models/foodState';
import { Store } from '@ngrx/store';
import * as foodAction from '../../shared/store/foods/foods.action';
import { getFoodList, getCategories, getFoodsLoadingStatus } from '../../shared/store/foods/foods.selector';
import { Food } from '../../shared/models/food.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public foodList$: Observable<Food[]>;
  public categories$: Observable<string[]>;
  public foodLoadingStatus$: Observable<boolean>;
  public selectedCategory: string = "All";

  constructor(private store: Store<FoodState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(foodAction.loadFoods());
    this.foodList$ = this.store.select(getFoodList());
    this.categories$ = this.store.select(getCategories);
    this.foodLoadingStatus$ = this.store.select(getFoodsLoadingStatus);
  }

  selectCategory(category: string): void {
    this.foodList$ = this.store.select(getFoodList(category));
    this.selectedCategory = category;
  }

  gotoFood(_id: string) {
    this.router.navigateByUrl(`/user/food/${_id}`);
  }

}
