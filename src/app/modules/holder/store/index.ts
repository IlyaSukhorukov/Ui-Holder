import {Card} from "./schema";
import {createReducer, MetaReducer, on} from "@ngrx/store";
import {clean, UserCardsLoaded} from "./holder-store.actions";

export const stateFeatureKey = 'HolderStore';

export interface IHolderState {
  cards: Card[];
}

export const initialState: IHolderState = {
  cards: [],
}

export const cardsReducer = createReducer(
  initialState,
  on(clean, state => initialState),
  on(UserCardsLoaded, (state, { list }) => ({
    ...state,
    cards: list,
  })),
);

export const metaReducers: MetaReducer<IHolderState>[] = [];
