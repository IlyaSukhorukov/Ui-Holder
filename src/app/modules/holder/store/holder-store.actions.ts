import {createAction, props} from "@ngrx/store";
import {Card, FriendRequest, User} from "./schema";

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

export const addFriend = createAction(HolderActionTypes.addFriend, props<{request: FriendRequest}>());
export const friendAdded = createAction(HolderActionTypes.friendAdded, props<{request: FriendRequest}>());

export const loadRequests = createAction(HolderActionTypes.loadRequests, props<{uuid: string}>());
export const requestsLoaded = createAction(HolderActionTypes.requestsLoaded, props<{requests: FriendRequest[]}>());
export const loadFamily = createAction(HolderActionTypes.loadFamily, props<{uuid: string}>());
export const familyLoaded = createAction(HolderActionTypes.familyLoaded, props<{family: FriendRequest[]}>());
export const loadSubscribers = createAction(HolderActionTypes.loadSubscribers, props<{uuid: string}>());
export const subscribersLoaded = createAction(HolderActionTypes.subscribersLoaded, props<{subscribers: FriendRequest[]}>());

export const deleteRelation = createAction(HolderActionTypes.deleteRelation, props<{uuid: string}>());
export const relationDeleted = createAction(HolderActionTypes.relationDeleted, props<{uuid: string}>());

export const updateRelation = createAction(HolderActionTypes.updateRelation, props<{uuid: string, status: string}>());
export const relationUpdated = createAction(HolderActionTypes.relationUpdated, props<{relation: FriendRequest}>());

export const clean = createAction(HolderActionTypes.clean);
