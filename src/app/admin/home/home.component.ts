import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food.model';
import { Store } from '@ngrx/store';
import { FoodState } from 'src/app/user/models/foodState';
import { Router } from '@angular/router';
import { foodAction } from 'src/app/shared/store';
import { getFoodList, getCategories, getFoodsLoadingStatus } from 'src/app/shared/store/foods/foods.selector';

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
    this.router.navigateByUrl(`/admin/edit/food/${_id}`);
  }

  deleteFood(_id: string) {
    this.store.dispatch(foodAction.deleteFood({ _id }));
  }

}
