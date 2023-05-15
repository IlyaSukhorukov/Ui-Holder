import {Card, Relations, User} from "./schema";
import {createReducer, MetaReducer, on} from "@ngrx/store";
import {
  cardLoaded,
  clean,
  familyLoaded, PublicUserCardsLoaded, relationDeleted,
  requestsLoaded,
  subscribersLoaded,
  UserCardsLoaded,
  userLoaded
} from "./holder-store.actions";

export const stateFeatureKey = 'HolderStore';

export interface IHolderState {
  user: User | null;
  card: Card | null;
  cards: Card[];

  requests: Relations[];
  family: Relations[];
  subscribers: Relations[];
}

export const initialState: IHolderState = {
  user: null,
  card: null,
  cards: [],

  requests: [],
  family: [],
  subscribers: [],
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
  on(PublicUserCardsLoaded, (state, { list }) => ({
    ...state,
    cards: list,
  })),
  on(requestsLoaded, (state, { requests }) => ({
    ...state,
    requests,
  })),
  on(familyLoaded, (state, { family }) => ({
    ...state,
    family,
  })),
  on(subscribersLoaded, (state, { subscribers }) => ({
    ...state,
    subscribers,
  })),
  on(relationDeleted, (state, { uuid }) => {
    console.log('in store ',uuid)
    return ({
      ...state,
      subscribers: state.subscribers.filter((e) => e.uuid !== uuid),
    })
  }),
);

export const metaReducers: MetaReducer<IHolderState>[] = [];
