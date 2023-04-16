import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IHolderState, stateFeatureKey} from "./index";

const State = createFeatureSelector<IHolderState>(stateFeatureKey);

export const selectCardsList = createSelector(State, (state) => state.cards);
