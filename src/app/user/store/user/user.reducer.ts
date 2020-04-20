import { createReducer, on } from '@ngrx/store';
import * as userAction from './user.action';
import { UserState } from '../../models/userState';

const initialState: UserState = {
    myCartBadgeCount: 0,
    myOrderBadgeCount: 0,
    myCart: {},
    myOrders: {},
    errorMessage: "",
    loading: false,
}

export const reducer = createReducer(
    initialState,
    on(userAction.addToCart, (state, { item }) => { 
        let newMyCart = { ...state.myCart};
        newMyCart[item._id] = item;
        return {
            ...state,
            myCart: newMyCart,
            myCartBadgeCount: state.myCartBadgeCount + 1
        };
    }),
    on(userAction.updateCart, (state, { item }) => { 
        let newMyCart = { ...state.myCart};
        newMyCart[item._id] = item;
        return {
            ...state,
            myCart: newMyCart,
        };
    }),
    on(userAction.removeCartItem, (state, { _id }) => { 
        let newMyCart = { ...state.myCart };
        delete newMyCart[_id];
        return {
            ...state,
            myCart: newMyCart,
            myCartBadgeCount: state.myCartBadgeCount - 1
        };
    }),
    on(userAction.loadingCart, (state) => ({ ...state, loading: true })),
    on(userAction.loadCartSuccess, (state, { data }) => ({ ...state, myCart: data, loading: false, myCartBadgeCount: Object.keys(data).length })),
    on(userAction.loadCartError, (state, { errorMessage }) => ({ ...state, errorMessage: errorMessage, loading: false })),
    on(userAction.incrementMyCartBadge, (state) => ({ ...state, myCartBadgeCount: state.myCartBadgeCount + 1, })),
    on(userAction.incrementMyOrderBadge, (state) => ({ ...state, myOrderBadgeCount: state.myOrderBadgeCount + 1, })),
    on(userAction.clearMyCartBadge, (state) => ({ ...state, myCartBadgeCount: 0, })),
    on(userAction.clearMyOrderBadge, (state) => ({ ...state, myOrderBadgeCount: 0, })),
    on(userAction.clearCart, (state) => ({ ...state, myCartBadgeCount: 0, myCart: {} })),
)