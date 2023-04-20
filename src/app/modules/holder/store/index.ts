import {Card} from "./schema";
import {createReducer, MetaReducer, on} from "@ngrx/store";
import {cardLoaded, clean, UserCardsLoaded} from "./holder-store.actions";

export const stateFeatureKey = 'HolderStore';

export interface IHolderState {
  card: Card | null;
  cards: Card[];
}

export const initialState: IHolderState = {
  card: null,
  cards: [],
}

export const cardsReducer = createReducer(
  initialState,
  on(clean, state => initialState),
  on(cardLoaded, (state, { card }) => ({
    ...state,
    card
  })),
  on(UserCardsLoaded, (state, { list }) => ({
    ...state,
    cards: list,
  })),
);

export const metaReducers: MetaReducer<IHolderState>[] = [];
