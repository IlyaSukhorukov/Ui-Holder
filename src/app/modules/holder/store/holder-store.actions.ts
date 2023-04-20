import {createAction, props} from "@ngrx/store";
import {Card} from "./schema";

export enum HolderActionTypes {
  loadCard = '[Holder] Load Card',
  cardLoaded = '[Holder] Card Loaded',
  loadUserCards = '[Holder] Load Cards',
  userCardsLoaded = '[Holder] Cards Loaded',
  clean = '[Holder] Clean store state',
}

export const loadCard = createAction(HolderActionTypes.loadCard, props<{uuid: string}>());
export const cardLoaded = createAction(HolderActionTypes.cardLoaded, props<{card: Card}>());
export const loadUserCards = createAction(HolderActionTypes.loadUserCards);
export const UserCardsLoaded = createAction(HolderActionTypes.userCardsLoaded, props<{list: Card[]}>());
export const clean = createAction(HolderActionTypes.clean);
