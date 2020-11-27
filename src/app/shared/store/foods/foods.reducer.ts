import { createReducer, on } from '@ngrx/store';
import * as foodActions from './foods.action';
import { FoodState } from 'src/app/user/models/foodState';

const initialState: FoodState = {
    data: {},
    categories: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
};

export const reducer = createReducer(
    initialState,
    on(foodActions.foodLoading, (state) => ({ ...state, isLoading: true })),
    on(foodActions.loadFoodsSuccess, (state, { foods, categories }) => ({ ...state, isLoading: false, data: foods, categories })),
    on(foodActions.loadFoodsError, (state, { errorMessage }) => ({ ...state, isLoading: false, isError: true, errorMessage })),
    on(foodActions.deleteFood, (state, { _id }) => {
        const tempData = Object.assign({}, state.data);
        delete tempData[_id];

        return { ...state, data: tempData };
    }),
    on(foodActions.addFood, (state, { item }) => {
        const tempData = Object.assign({}, state.data);
        tempData[item._id] = item;
        return {
            ...state,
            data: tempData
        };
    }),
    on(foodActions.updateFood, (state, { item }) => {
        const tempData = Object.assign({}, state.data);
        tempData[item._id] = item;
        return {
            ...state,
            data: tempData
        };
    })
);
