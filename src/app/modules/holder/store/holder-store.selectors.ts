import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IHolderState, stateFeatureKey} from "./index";

const State = createFeatureSelector<IHolderState>(stateFeatureKey);

export  const selectCard = createSelector(State, (state) => state.card);
export const selectCardsList = createSelector(State, (state) => state.cards);
