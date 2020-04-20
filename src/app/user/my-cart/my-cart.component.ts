import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState, MyCartItem, OrderStatus } from '../models/userState';
import { Observable, Subscription } from 'rxjs';
import { getCartList, getTotalPrice } from '../store/user/user.selector';
import { userAction } from '../store/index';
import { Router } from '@angular/router';
import { tap, concatMap, take } from 'rxjs/operators';
import { UserApiService } from '../user-api.service';
import { data } from 'src/app/shared/models/foodData3';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit, OnDestroy {
  
  public cartList$: Observable<MyCartItem[]>;
  public totalPrice$: Observable<number>;
  public isChecingOut: boolean = false;
  public checkoutSubscription: Subscription;

  constructor(private store: Store<UserState>, private router: Router, private userApi: UserApiService) { }

  ngOnInit(): void {
    this.cartList$ = this.store.select(getCartList);
    this.totalPrice$ = this.store.select(getTotalPrice);
  }

  ngOnDestroy(): void {
    this.checkoutSubscription?.unsubscribe();
  }

  ObjectId(m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  }

  gotoFood(_id: string) {
    this.router.navigateByUrl(`/user/food/${_id}`);
  }

  clearCart() {
    this.store.dispatch(userAction.clearCart());
  }

  checkOut() {
    this.isChecingOut = true;
    this.store.select(getCartList)
    .pipe(
      take(1),
      concatMap(data => {
        if(data) {
          return this.userApi.checkOutItem({
            _id: this.ObjectId(),
            cartItems: data,
            orderStatus: OrderStatus.pending,
            timeStamp: new Date()
          })
        }
      })
    ).subscribe(data => {
      console.log("checkout response", data);   
      this.isChecingOut = false;
      this.clearCart();
    });
  }
}
