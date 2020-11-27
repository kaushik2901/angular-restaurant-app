import { Food } from './food.model';

export interface FoodResponse {
    success: boolean;
    data: {
        foods: {
            [_id: string]: Food
        },
        categories: string[],
    };
    error: string | null;
}
