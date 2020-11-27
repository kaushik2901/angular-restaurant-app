import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoodState } from 'src/app/user/models/foodState';
import { Subscription, of } from 'rxjs';
import { getFoodItemById } from 'src/app/shared/store/foods/foods.selector';
import { concatMap } from 'rxjs/operators';
import { foodAction } from 'src/app/shared/store';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Food, FoodVarients, AddOns } from 'src/app/shared/models/food.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit, OnDestroy {

  public foodItemForm: FormGroup;
  public varientItems: FoodVarients[] = [];
  public addOnItems: AddOns[] = [];

  private foodSubscription: Subscription;
  private pageParamMapSubscription: Subscription;
  public isUpdating: boolean;
  private foodId: string;
  public food: Food;
  public isLoadingFood = true;

  constructor(private store: Store<FoodState>, private route: ActivatedRoute, private fb: FormBuilder) { }

  ObjectId(m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  get getVarients() {
    return this.foodItemForm.get('varients') as FormArray;
  }
  get getAddOns() {
    return this.foodItemForm.get('addOns') as FormArray;
  }

  addVarient() {
    this.varientItems.push({
      _id: this.ObjectId(),
      name: '',
      description: '',
      addedPrice: 0
    });


    this.getVarients.push(
      this.fb.group({
        _id: [this.ObjectId()],
        name: ['', Validators.required],
        description: ['', Validators.required],
        addedPrice: [0, Validators.required],
      })
    );
  }

  addAddOn() {
    this.addOnItems.push({
      _id: this.ObjectId(),
      name: '',
      description: '',
      addedPrice: 0
    });


    this.getAddOns.push(
      this.fb.group({
        _id: [this.ObjectId()],
        name: ['', Validators.required],
        description: ['', Validators.required],
        addedPrice: [0, Validators.required],
      })
    );
  }

  removeVarient() {
    this.varientItems.pop();
    this.getVarients.removeAt(this.getVarients.length - 1);
  }

  removeAddOn() {
    this.addOnItems.pop();
    this.getAddOns.removeAt(this.getAddOns.length - 1);
  }

  ngOnInit(): void {
    this.pageParamMapSubscription = this.route.paramMap
    .subscribe((paramMap) => {
      this.foodId = paramMap.get('id');
      if (this.foodId) {
        this.isUpdating = true;
        this.getFoodItem();
        return;
      } else {
        this.isUpdating = false;
        this.isLoadingFood = false;

        this.foodItemForm = this.fb.group({
          _id: [this.ObjectId(), Validators.required],
          name: ['', Validators.required],
          category: ['', Validators.required],
          url: ['', Validators.required],
          basePrice: [, Validators.required],
          description: ['', Validators.required],
          varients: this.fb.array([]),
          addOns: this.fb.array([]),
        });
      }

      console.log('isUpdating', this.isUpdating);

    });
  }

  ngOnDestroy(): void {
    this.foodSubscription?.unsubscribe();
    this.pageParamMapSubscription?.unsubscribe();
  }

  getFoodItem() {
    this.foodSubscription = this.store.select(getFoodItemById(this.foodId)).pipe(
      concatMap(data => {
        if (!data) {
          this.store.dispatch(foodAction.loadFoods());
          return this.store.select(getFoodItemById(this.foodId));
        }
        return of(data);
      })
    ).subscribe(data => {
      if (data) {
        this.food = data;
        this.isLoadingFood = false;

        this.foodItemForm = this.fb.group({
          _id: [this.food._id, Validators.required],
          name: [this.food.name, Validators.required],
          category: [this.food.category, Validators.required],
          url: [this.food.url, Validators.required],
          basePrice: [this.food.basePrice, Validators.required],
          description: [this.food.description, Validators.required],
          varients: this.fb.array([]),
          addOns: this.fb.array([]),
        });

        for (let i = 0; i < this.food.varients.length; i++) {
          const element = this.food.varients[i];
          this.getVarients.push(
            this.fb.group({
              _id: [element._id],
              name: [element.name, Validators.required],
              description: [element.description, Validators.required],
              addedPrice: [element.addedPrice, Validators.required],
            })
          );
        }

        for (let i = 0; i < this.food.addOns.length; i++) {
          const element = this.food.addOns[i];
          this.getAddOns.push(
            this.fb.group({
              _id: [element._id],
              name: [element.name, Validators.required],
              description: [element.description, Validators.required],
              addedPrice: [element.addedPrice, Validators.required],
            })
          );
        }
      }
    });
  }

  submit() {
    // if(this.isUpdating) {

    // } else {
      // add food
      if (this.foodItemForm.valid) {
        console.log(this.foodItemForm.value);
        this.store.dispatch(foodAction.addFood({ item: this.foodItemForm.value }));
        alert('Success');
      }
    // }
  }

}
