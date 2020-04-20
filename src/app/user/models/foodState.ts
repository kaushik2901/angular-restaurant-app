import { Food } from '../../shared/models/food.model';

export interface FoodState {
    data: {
        [_id:string]: Food
    },
    categories: string[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}