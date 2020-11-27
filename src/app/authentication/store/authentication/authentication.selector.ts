import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/authState.model';

export const getUserState = createFeatureSelector<AuthState>('authentication');

export const getUserLoadingStatus = createSelector(
    getUserState,
    state => state.isLoading
);

export const getUserAuthenticatedStatus = createSelector(
    getUserState,
    state => state.isAuthenticated,
);
