import {createAction, props} from "@ngrx/store";
import {Card, User} from "./schema";

export enum HolderActionTypes {
  loadUser = '[Holder] Load User',
  userLoaded = '[Holder] User Loaded',
  loadCard = '[Holder] Load Card',
  cardLoaded = '[Holder] Card Loaded',
  loadUserCards = '[Holder] Load Cards',
  userCardsLoaded = '[Holder] Cards Loaded',
  createCard = '[Holder] Create Card',
  cardCreated = '[Holder] Card Created',
  updateCard = '[Holder] Update Card',
  cardUpdated = '[Holder] Card Updated',
  clean = '[Holder] Clean store state',
}

export const loadUser = createAction(HolderActionTypes.loadUser, props<{public_id: string}>());
export const userLoaded = createAction(HolderActionTypes.userLoaded, props<{user: User}>());

export const loadCard = createAction(HolderActionTypes.loadCard, props<{uuid: string}>());
export const cardLoaded = createAction(HolderActionTypes.cardLoaded, props<{card: Card}>());

export const loadUserCards = createAction(HolderActionTypes.loadUserCards, props<{id: string}>());
export const UserCardsLoaded = createAction(HolderActionTypes.userCardsLoaded, props<{list: Card[]}>());

export const createCard = createAction(HolderActionTypes.createCard, props<{card: Card}>());
export const cardCreated = createAction(HolderActionTypes.cardCreated, props<{card: Card}>());

export const updateCard = createAction(HolderActionTypes.updateCard, props<{card: Card}>());
export const cardUpdated = createAction(HolderActionTypes.cardUpdated, props<{card: Card}>());

export const clean = createAction(HolderActionTypes.clean);
