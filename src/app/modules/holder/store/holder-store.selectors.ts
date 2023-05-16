import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IHolderState, stateFeatureKey} from "./index";

const State = createFeatureSelector<IHolderState>(stateFeatureKey);

export const selectUser = createSelector(State, (state) => state.user);
export const selectCard = createSelector(State, (state) => state.card);
export const selectCardsList = createSelector(State, (state) => state.cards);

export const selectRequests = createSelector(State, (state) => state.requests);
export const selectFamily = createSelector(State, (state) => state.family);
export const selectSubscribers = createSelector(State, (state) => state.subscribers);

export const selectSubsId = createSelector(State, (state) => state.subsId);
export const selectFamilyId = createSelector(State, (state) => state.familyId);
