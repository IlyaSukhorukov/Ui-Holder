import {Card} from "./schema";
import {createReducer, on} from "@ngrx/store";
import {clean, UserCardsLoaded} from "./holder-store.actions";

export const initialCards: Card[] = [];

export const cardsReducer = createReducer(
  initialCards,
  on(clean, state => []),
  on(UserCardsLoaded, (state, { list }) => {
    return JSON.parse(JSON.stringify(list));
  }),
);
