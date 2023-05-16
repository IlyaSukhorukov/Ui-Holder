import {Card, Relations, User} from "./schema";
import {createReducer, MetaReducer, on} from "@ngrx/store";
import {
  cardCreated,
  cardDeleted,
  cardLoaded,
  clean,
  familyLoaded, PublicUserCardsLoaded, relationDeleted,
  requestsLoaded,
  subscribersLoaded, subsIdLoaded,
  UserCardsLoaded,
  userLoaded
} from "./holder-store.actions";

export const stateFeatureKey = 'HolderStore';

export interface IHolderState {
  user: User | null;
  card: Card | null;
  cards: Card[];
  subsId: string[];
  familyId: string[];

  requests: Relations[];
  family: Relations[];
  subscribers: Relations[];
}

export const initialState: IHolderState = {
  user: null,
  card: null,
  cards: [],
  subsId: [],
  familyId: [],

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
  on(cardCreated, (state, { card }) => ({
    ...state,
    cards: [...state.cards, card]
  })),
  on(cardDeleted, (state, { uuid }) => ({
    ...state,
    cards: state.cards.filter((e)=> e.id !== uuid)
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
  on(subsIdLoaded, (state, { subsId, familyId }) => ({
    ...state,
    subsId,
    familyId
  })),
);

export const metaReducers: MetaReducer<IHolderState>[] = [];
