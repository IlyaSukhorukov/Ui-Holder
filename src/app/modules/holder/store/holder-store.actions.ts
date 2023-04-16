import {createAction, props} from "@ngrx/store";
import {Card} from "./schema";

export enum HolderActionTypes {
  loadUserCards = '[Holder] Load Cards',
  userCardsLoaded = '[Holder] Cards Loaded',
  clean = '[Holder] Clean store state',
}

export const loadUserCards = createAction(HolderActionTypes.loadUserCards);
export const UserCardsLoaded = createAction(HolderActionTypes.userCardsLoaded, props<{list: Card[]}>());
export const clean = createAction(HolderActionTypes.clean);
