import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodState } from 'src/app/user/models/foodState';

export const getFoods = createFeatureSelector<FoodState>('food');

export const getFoodsLoadingStatus = createSelector(
    getFoods,
    state => state.isLoading
);

export const getFoodsEntities = createSelector(
    getFoods,
    foodState => foodState.data
);

export const getFoodItemById = (_id: string) => createSelector(
    getFoodsEntities,
    entities => entities[_id]
);

export const getFoodList = (category: string = 'All') => createSelector(
    getFoodsEntities,
    foodObject => {
        const list = Object.keys(foodObject);
        const data = list.map(id => foodObject[id]);
        return data.filter(item => category == 'All' ? true : item.category == category);
    }
);

export const getCategories = createSelector(
    getFoodList('All'),
    foodState => {
        const test = new Set<string>();
        test.add('All');
        for (let i = 0; i < foodState.length; i++) {
            const element = foodState[i];
            test.add(element.category);
        }
        return Array.from(test);
    }
);
