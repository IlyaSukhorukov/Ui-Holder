import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, tap } from 'rxjs/operators';
import {Apollo, gql} from "apollo-angular";
import {
  cardCreated,
  cardLoaded, cardUpdated,
  createCard,
  loadCard,
  loadUser,
  loadUserCards, updateCard,
  UserCardsLoaded, userLoaded
} from "./holder-store.actions";
import {Card, User} from "./schema";
import {MutationOptions, QueryOptions} from "@apollo/client/core";

const generateQueryLoadUser = (public_id: string): string => `
  query {
  users(where: {public_id: {_eq: "${public_id}"}}) {
    public_name
    public_id
  }
}
`

const generateQueryLoadCard = (uuid: string): string => `
  query {
  cards(where: {id: {_eq: "${uuid}"}}) {
    stat_opened
    name
    is_favorite
    id_user
    id
    code
    type
    description
  }
}
`

const generateQueryLoadUserCards = (id: string): string => `
  query {
      cards(where: {id_user: {_eq: "${id}"}}) {
        code
        id
        id_user
        is_favorite
        name
        stat_opened
        type
        description
      }
  }
`

const QUERY_LOAD_USER_CARDS = gql`
  query {
      cards {
        code
        id
        id_user
        is_favorite
        name
        stat_opened
        type
        description
      }
  }
`
const QUERY_ADD_CARD = gql`
  mutation ($card: cards_insert_input!) {
    insert_cards_one(object: $card) {
      name
      type
      id_user
      description
      access
      code
    }
  }
`

const MUTATION_UPDATE_CARD = gql`
  mutation ($id: uuid, $card: cards_set_input!) {
    update_cards(where: { id: { _eq: $id } }, _set: $card) {
      affected_rows
      returning {
        code
        id
        id_user
        is_favorite
        name
        stat_opened
        type
        description
      }
    }
  }
`

@Injectable()
export class HolderStoreEffects {
  constructor(private actions$: Actions, private _apollo: Apollo) {}

  $getUser = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUser),
    exhaustMap(({ public_id }) => {
      const qo: QueryOptions = {
        query: gql`${generateQueryLoadUser(public_id)}`,
        fetchPolicy: 'no-cache',
      }
      return this._apollo.query<{ user: User }>(qo).pipe(
        // @ts-ignore
        map(({data}) => userLoaded({user: data.users[0]}))
      );
    })
  ));

  $getCard = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCard),
      exhaustMap(({ uuid }) => {
        const qo: QueryOptions = {
          query: gql`${generateQueryLoadCard(uuid)}`,
          fetchPolicy: 'no-cache',
        }
        return this._apollo.query<{ card: Card }>(qo).pipe(
          // @ts-ignore
          map(({data}) => cardLoaded({card: data.cards[0]}))
        );
      })
    ));

  $getUserCards = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserCards),
      exhaustMap(({ id }) => {
        const qo: QueryOptions = {
          query: gql`${generateQueryLoadUserCards(id)}`,
          fetchPolicy: 'no-cache',
        }
        return this._apollo.query<{list: Card[]}>(qo).pipe(
          // @ts-ignore
          map(({data}) => UserCardsLoaded({list: JSON.parse(JSON.stringify(data['cards']))}))
        );
      })
    ));

  $createCard = createEffect(() =>
    this.actions$.pipe(
      ofType(createCard),
      exhaustMap(({ card }) => {
        const qo: QueryOptions = {
          query: QUERY_ADD_CARD,
          variables: {
            card
          },
          fetchPolicy: 'no-cache',
        }
        return this._apollo.query<{card: Card}>(qo).pipe(
          // @ts-ignore
          map(({data}) => cardCreated({card: JSON.parse(JSON.stringify(data['cards']))})),
          tap((e) => {
            // console.log(e) debug
          }),
        );
      })
    ));

  $updateCard = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCard),
      exhaustMap(({ card }) => {
        const mutationOptions: MutationOptions = {
          mutation: MUTATION_UPDATE_CARD,
          variables: {
            id: card.id,
            card: card
          },
          fetchPolicy: 'no-cache',
        }
        return this._apollo.mutate<{card: Card}>(mutationOptions).pipe(
          // @ts-ignore
          map(({data}) => cardUpdated({card: JSON.parse(JSON.stringify(data['update_cards']['returning'][0]))})),
          tap((e) => {
            // console.log('updated ',e); debug
          }),
        );
      })
    ));
}
