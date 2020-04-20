import { createAction, props } from "@ngrx/store";
import { Food } from 'src/app/shared/models/food.model';

export const INITIATE_FOOD_LOADING = '[User/Admin Home] initiate foods loading';
export const FOOD_LOADING = '[User/Admin Home] food loading';
export const LOAD_FOODS_SUCCESS = '[User/Admin Home] load foods success';
export const LOAD_FOODS_ERROR = '[User/Admin Home] load foods error';
export const DELETE_FOOD = '[Admin Home] delete food';
export const ADD_FOOD = '[Admin Home] Add food';
export const UPDATE_FOOD = '[Admin Home] Update food';

export const loadFoods = createAction(INITIATE_FOOD_LOADING);
export const foodLoading = createAction(FOOD_LOADING);

export const addFood = createAction(
    ADD_FOOD,
    props<{ item: Food }>()
);

export const updateFood = createAction(
    UPDATE_FOOD,
    props<{ item: Food }>()
);

export const loadFoodsSuccess = createAction(
    LOAD_FOODS_SUCCESS,
    props<{ foods: { [_id: string]: Food }, categories: string[] }>()
);

export const loadFoodsError = createAction(
    LOAD_FOODS_ERROR,
    props<{ errorMessage: string }>()
);

export const deleteFood = createAction(
    DELETE_FOOD,
    props<{ _id: string }>()
);