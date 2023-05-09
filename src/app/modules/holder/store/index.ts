import {Card, User} from "./schema";
import {createReducer, MetaReducer, on} from "@ngrx/store";
import {cardLoaded, clean, UserCardsLoaded, userLoaded} from "./holder-store.actions";

export const stateFeatureKey = 'HolderStore';

export interface IHolderState {
  user: User | null;
  card: Card | null;
  cards: Card[];
}

export const initialState: IHolderState = {
  user: null,
  card: null,
  cards: [],
}

export const cardsReducer = createReducer(
  initialState,
  on(clean, state => initialState),
  on(userLoaded, (state, { user }) => ({
    ...state,
    user
  })),
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
