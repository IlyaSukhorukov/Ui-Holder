import {createAction, props} from "@ngrx/store";
import {Card, Relations, User} from "./schema";
import {selectSubsId} from "./holder-store.selectors";

export enum HolderActionTypes {
  loadUser = '[Holder] Load User',
  userLoaded = '[Holder] User Loaded',
  loadCard = '[Holder] Load Card',
  cardLoaded = '[Holder] Card Loaded',
  deleteCard = '[Holder] Delete Card',
  cardDeleted = '[Holder] Card Deleted',
  loadUserCards = '[Holder] Load Cards',
  userCardsLoaded = '[Holder] Cards Loaded',
  loadPublicUserCards = '[Holder] Load Public Cards',
  publicUserCardsLoaded = '[Holder] Public Cards Loaded',
  createCard = '[Holder] Create Card',
  cardCreated = '[Holder] Card Created',
  updateCard = '[Holder] Update Card',
  cardUpdated = '[Holder] Card Updated',
  clean = '[Holder] Clean store state',
  addFriend = '[Holder] Add Friend',
  friendAdded = '[Holder] Friend Added',

  loadRequests = '[Holder] Load Requests',
  requestsLoaded = '[Holder] Requests Loaded',
  loadFamily = '[Holder] Load Family',
  familyLoaded = '[Holder] Family Loaded',
  loadSubscribers = '[Holder] Load Subscribers',
  subscribersLoaded = '[Holder] Subscribers Loaded',
  deleteRelation = '[Holder] Delete Relation',
  relationDeleted = '[Holder] Relation Deleted',
  updateRelation = '[Holder] Update Relation',
  relationUpdated = '[Holder] Relation Updated',
  loadSubsId = '[Holder] Load SubsId',
  subsIdLoaded = '[Holder] SubsId Loaded',
}

export const loadUser = createAction(HolderActionTypes.loadUser, props<{public_id: string}>());
export const userLoaded = createAction(HolderActionTypes.userLoaded, props<{user: User}>());

export const loadCard = createAction(HolderActionTypes.loadCard, props<{uuid: string}>());
export const cardLoaded = createAction(HolderActionTypes.cardLoaded, props<{card: Card}>());

export const deleteCard = createAction(HolderActionTypes.deleteCard, props<{uuid: string}>());
export const cardDeleted = createAction(HolderActionTypes.cardDeleted, props<{uuid: string}>());

export const loadUserCards = createAction(HolderActionTypes.loadUserCards, props<{subIds: string[], familyIds: string[]}>());
export const UserCardsLoaded = createAction(HolderActionTypes.userCardsLoaded, props<{list: Card[]}>());

export const loadPublicUserCards = createAction(HolderActionTypes.loadPublicUserCards, props<{id: string}>());
export const PublicUserCardsLoaded = createAction(HolderActionTypes.publicUserCardsLoaded, props<{list: Card[]}>());

export const createCard = createAction(HolderActionTypes.createCard, props<{card: Card}>());
export const cardCreated = createAction(HolderActionTypes.cardCreated, props<{card: Card}>());

export const updateCard = createAction(HolderActionTypes.updateCard, props<{card: Card}>());
export const cardUpdated = createAction(HolderActionTypes.cardUpdated, props<{card: Card}>());

export const addFriend = createAction(HolderActionTypes.addFriend, props<{request: Relations}>());
export const friendAdded = createAction(HolderActionTypes.friendAdded, props<{request: Relations}>());

export const loadRequests = createAction(HolderActionTypes.loadRequests, props<{uuid: string}>());
export const requestsLoaded = createAction(HolderActionTypes.requestsLoaded, props<{requests: Relations[]}>());
export const loadFamily = createAction(HolderActionTypes.loadFamily, props<{uuid: string}>());
export const familyLoaded = createAction(HolderActionTypes.familyLoaded, props<{family: Relations[]}>());
export const loadSubscribers = createAction(HolderActionTypes.loadSubscribers, props<{uuid: string}>());
export const subscribersLoaded = createAction(HolderActionTypes.subscribersLoaded, props<{subscribers: Relations[]}>());

export const deleteRelation = createAction(HolderActionTypes.deleteRelation, props<{uuid: string}>());
export const relationDeleted = createAction(HolderActionTypes.relationDeleted, props<{uuid: string}>());

export const updateRelation = createAction(HolderActionTypes.updateRelation, props<{uuid: string, status: string}>());
export const relationUpdated = createAction(HolderActionTypes.relationUpdated, props<{relation: Relations}>());

export const loadSubsId = createAction(HolderActionTypes.loadSubsId, props<{uuid: string}>());
export const subsIdLoaded = createAction(HolderActionTypes.subsIdLoaded, props<{subsId: string[], familyId: string[]}>());

export const clean = createAction(HolderActionTypes.clean);
