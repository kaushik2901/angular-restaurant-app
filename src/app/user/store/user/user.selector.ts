import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/userState';

export const getUser = createFeatureSelector<UserState>('user');

export const getBadgeCounts = createSelector(
    getUser,
    user => ({ myCart: user.myCartBadgeCount, myOrder: user.myOrderBadgeCount })
);

export const getCartEntity = createSelector(
    getUser,
    (user) => user.myCart
);

export const getCartList = createSelector(
    getCartEntity,
    (cart) => {
        const cartKeys = Object.keys(cart);
        return cartKeys.map(key => cart[key]);
    }
);

export const getTotalPrice = createSelector(
    getCartList,
    (list) => {
        let price = 0;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            price += (element.finalPrice * element.quantity);
        }
        return price;
    }
);

export const getCartById = (_id: string) => createSelector(
    getCartEntity,
    (cart) => cart[_id]
);
