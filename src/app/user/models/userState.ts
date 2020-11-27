import { Food, FoodVarients, AddOns } from 'src/app/shared/models/food.model';

export interface UserState {
    myCartBadgeCount: number;
    myOrderBadgeCount: number;
    myCart: {
        [_id: string]: MyCartItem
    };
    myOrders: {
        [_id: string]: MyOrderItem
    };
    errorMessage: string;
    loading: boolean;
}

export interface MyCartItem {
    _id: string;
    food: Food;
    varient: FoodVarients;
    addOns: AddOns[];
    finalPrice: number;
    quantity: number;
    timeStamp: Date;
}

export interface MyOrderItem {
    _id: string;
    cartItems: MyCartItem[];
    orderStatus: OrderStatus;
    timeStamp: Date;
}

export enum OrderStatus {
    pending = 'pending',
    confirmed = 'confirmed',
    completed = 'completed'
}
