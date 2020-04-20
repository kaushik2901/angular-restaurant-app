import { createAction, props } from "@ngrx/store";
import { MyCartItem } from '../../models/userState';

export const ADD_TO_CART = "[User Food Item] add to cart";
export const UPDATE_CART = "[User Food Item] update cart";
export const REMOVE_CART_ITEM = "[User Food Item] remove cart item";
export const LOAD_CART = "[User Cart List] initiating user cart";
export const LOADING_CART = "[User Cart List] loading user cart";
export const LOAD_CART_SUCCESS = "[User Cart List] user cart loaded";
export const LOAD_CART_ERROR = "[User Cart List] user cart failed";
export const ERROR_OCCURED = "[User Food Item] error";
export const INCREMENT_MY_CART_BADGE = "[User Navbar] increment my cart badge counter";
export const CLEAR_MY_CART_BADGE = "[User Navbar] clear my cart badge counter";
export const INCREMENT_MY_ORDER_BADGE = "[User Navbar] increment my order badge counter";
export const CLEAR_MY_ORDER_BADGE = "[User Navbar] clear my order badge counter";
export const CLEAR_CART = "[User Cart] clear cart";

export const addToCart = createAction(
    ADD_TO_CART,
    props<{ item: MyCartItem }>()
);

export const updateCart = createAction(
    UPDATE_CART,
    props<{ item: MyCartItem }>()
)

export const removeCartItem = createAction(
    REMOVE_CART_ITEM,
    props<{ _id: string}>()
);

export const loadCart = createAction(LOAD_CART);

export const loadingCart = createAction(LOADING_CART);

export const loadCartSuccess = createAction(
    LOAD_CART_SUCCESS,
    props<{ data: { [_id:string]: MyCartItem } }>()
);

export const loadCartError = createAction(
    LOAD_CART_ERROR,
    props<{ errorMessage: string }>()
);

export const incrementMyCartBadge = createAction(INCREMENT_MY_CART_BADGE);
export const incrementMyOrderBadge = createAction(INCREMENT_MY_ORDER_BADGE);

export const clearMyCartBadge = createAction(CLEAR_MY_CART_BADGE);
export const clearMyOrderBadge = createAction(CLEAR_MY_ORDER_BADGE);

export const clearCart = createAction(CLEAR_CART);