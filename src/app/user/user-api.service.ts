import { Injectable } from '@angular/core';
import { CartResponse } from './models/cartResponse';
import { Observable, of } from 'rxjs';
import { MyOrderItem } from './models/userState';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor() { }

  getCart(): Observable<CartResponse> {
    return of({
      success: true,
      data: {},
      error: null,
    });
  }

  checkOutItem(orderItems: MyOrderItem): Observable<{ success: boolean, error: string | null }> {
    if (!localStorage.getItem('order_queue')) {
      localStorage.setItem('order_queue', JSON.stringify([]));
    }

    const queueRawData = localStorage.getItem('order_queue');
    const queue = JSON.parse(queueRawData);

    const newData = [...queue, orderItems];
    localStorage.setItem('order_queue', JSON.stringify(newData));

    return of({
      success: true,
      error: null,
    }).pipe(
      delay(2000),
    );
  }
}
