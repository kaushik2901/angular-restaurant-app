import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Food, FoodVarients } from 'src/app/shared/models/food.model';
import { FoodState } from '../models/foodState';
import { Store } from '@ngrx/store';
import * as foodAction from '../../shared/store/foods/foods.action';
import { getFoodItemById } from '../../shared/store/foods/foods.selector';
import { concatMap, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyCartItem, UserState } from '../models/userState';
import { userAction } from '../store/index';
import { getCartById, getCartList } from '../store/user/user.selector';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, OnDestroy {

  public isUpdating: boolean;
  public oldId: string;
  public shouldUpdate: boolean = false;

  public cartForm: FormGroup;

  public foodId: string;
  private pageParamMap$: Subscription;
  
  public isLoadingFood: boolean = true;
  public showCartOptions: boolean = false;
  public food: Food;
  public foodSubscription: Subscription;
  public cardListSubscription: Subscription;
  
  public calculatedFoodPrice: number;
  public selectedVarient: FoodVarients = null;

  constructor(private route: ActivatedRoute, private store: Store<FoodState>, private userStore: Store<UserState>, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.pageParamMap$ = this.route.data.pipe(
      concatMap(data => {
        this.isUpdating = data.update == true;
        return this.route.paramMap;
      })
    ).subscribe((paramMap) => {
      this.foodId = paramMap.get('id');
      if(this.isUpdating) {
        this.getCartItem();
      } else {
        this.getFoodItem();
      }
    });
  }

  getFoodItem() {
    this.foodSubscription = this.store.select(getFoodItemById(this.foodId)).pipe(
      concatMap(data => {
        if(!data) {
          this.store.dispatch(foodAction.loadFoods());
          return this.store.select(getFoodItemById(this.foodId));
        }
        return of(data);
      })
    ).subscribe(data => {
      if(data) {
        this.food = data;
        this.isLoadingFood = false;

        this.cartForm = this.fb.group({
          varient: ['base_value', Validators.required],
          addOns: this.fb.array(this.food.addOns.map(addOn => false)),
          qty: [1, Validators.required],
          finalPrice: [parseFloat(this.food.basePrice.toString()), Validators.required],
        })
      }
    });
  }

  getCartItem() {
    this.foodSubscription = this.userStore.select(getCartById(this.foodId)).pipe(
      concatMap(data => {
        this.store.dispatch(foodAction.loadFoods());
        return of(data);
      })
    ).subscribe(data => {
      if(data) {
        this.food = data.food;
        this.isLoadingFood = false;
        this.oldId = data._id;

        this.cartForm = this.fb.group({
          varient: [data.varient == null? 'base_value' : data.varient._id, Validators.required],
          addOns: this.fb.array(data.food.addOns.map(addOn => {
            // console.log("addonCheck", data.addOns.find(add => add._id == addOn._id));
            const temp = data.addOns.find(add => add._id == addOn._id);
            return temp != null ? true: false;
          })),
          qty: [data.quantity, Validators.required],
          finalPrice: [data.finalPrice, Validators.required],
        })
      }
    })
  }

  // Form functions [Start] -------------------
  selectChange(data) {
    const oldValues = this.cartForm.get('addOns').value;
    const oldFinalPrice = this.cartForm.get('finalPrice').value;
    const addedPrice = parseFloat(this.food.addOns[data.source.name].addedPrice.toString());
    oldValues[data.source.name] = data.checked;
    this.cartForm.patchValue({
      addOn: oldValues,
      finalPrice: data.checked ? oldFinalPrice + addedPrice : oldFinalPrice - addedPrice,
    })
  }

  radioChange(data) {
    const varient: FoodVarients = this.food.varients.filter(v => v._id == data.value)[0];
    this.cartForm.patchValue({
      finalPrice: parseFloat(this.food.basePrice.toString()) + (varient ? parseFloat(varient.addedPrice.toString()) : 0),
    })
  }

  addQty(value: number) {
    if(this.cartForm.get('qty').value + value >= 1 && this.cartForm.get('qty').value + value < 100) {
      this.cartForm.patchValue({
        qty: this.cartForm.get('qty').value + value
      }); 
    }
  }

  addPrice(price: string) {
    this.calculatedFoodPrice = parseFloat(this.food.basePrice.toString()) + parseFloat(price);
  }

  selectVarient(varient: FoodVarients) {
    if(varient == null) {
      this.selectedVarient = null;
      this.calculatedFoodPrice = parseFloat(this.food.basePrice.toString());
      return;
    }
    this.calculatedFoodPrice = parseFloat(this.food.basePrice.toString()) + parseFloat(varient.addedPrice.toString());
    this.selectedVarient = varient;
  }

  // Form functions [End] -------------------

  ObjectId(m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  isBothItemAreEqual(item1: MyCartItem, item2: MyCartItem): boolean {
    if(
        item1.food._id != item2.food._id ||
        item1.varient?._id != item2.varient?._id ||
        item1.addOns.length != item2.addOns.length
    ){
        console.log("different");          
        console.log(item1.food._id != item2.food._id , item1.food._id, item2.food._id , );
        console.log(item1.varient?._id != item2.varient?._id , item1.varient?._id, item2.varient?._id , );
        console.log(item1.addOns.length != item2.addOns.length, item1.addOns.length, item2.addOns.length, );
        return false;
    }

    for (let i = 0; i < item1.addOns.length; i++) {
        const addOn1 = item1.addOns[i]._id;
        const addOn2 = item2.addOns[i]._id;
        if(addOn1 != addOn2) {
            return false;
        }
    }
    
    return true;
  }

  addToCart() {
    // this.dialogService.openAlertDialog('text', 'text', 'ok');
    const formValue = this.cartForm.value;

    const currentVarient = formValue.varient == 'base_value' ? null : this.food.varients.filter(f => f._id == formValue.varient)[0];
    const addOns = [];
    

    console.log("food", this.food);
    

    for (let i = 0; i < this.food.addOns.length; i++) {
      const element = this.food.addOns[i];
      if(formValue.addOns[i] == true) {
        addOns.push(element);
      }
    }


    //on Success
    const finalData: MyCartItem = {
      _id: this.isUpdating ? this.oldId : this.ObjectId().toString(),
      food: this.food,
      varient: currentVarient,
      addOns: addOns,
      finalPrice: formValue.finalPrice,
      quantity: formValue.qty,
      timeStamp: new Date(),
    }


    if(this.isUpdating) {
      console.log("isUpdating");
      console.log(finalData);      
      this.userStore.dispatch(userAction.updateCart({ item: finalData }));
    } else {
      this.cardListSubscription = this.store.select(getCartList)
      .pipe(take(1))
      .subscribe(cartList => {
        console.log("cart List", cartList.length, cartList);
        for (let i = 0; i < cartList.length; i++) {
            const item = cartList[i];
            if(this.isBothItemAreEqual(item, finalData)) {
                console.log("updating old item");                            
                const newItem = Object.assign({}, item);
                newItem.quantity = item.quantity + finalData.quantity;
                this.store.dispatch(userAction.updateCart({ item: newItem }));
                this.cardListSubscription?.unsubscribe();
                return;
            }
        }
        console.log("adding new item");                    
        this.store.dispatch(userAction.addToCart({ item: finalData }));
        this.cardListSubscription?.unsubscribe();
        return;
      });
    }
    this.showCartOptions = true;
  }

  resetForm() {
    this.cartForm.patchValue({
      varient: 'base_value',
      addOns: this.food.addOns.map(addOn => false),
      qty: 1,
      finalPrice: parseFloat(this.food.basePrice.toString()),
    });
  }

  goToUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy(): void {
    this.pageParamMap$.unsubscribe();
    this.foodSubscription.unsubscribe();
    this.cardListSubscription?.unsubscribe();
  }
}
