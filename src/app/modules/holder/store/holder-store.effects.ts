import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, tap } from 'rxjs/operators';
import {Apollo, gql} from "apollo-angular";
import {cardCreated, cardLoaded, createCard, loadCard, loadUserCards, UserCardsLoaded} from "./holder-store.actions";
import {Card} from "./schema";
import {QueryOptions} from "@apollo/client/core";

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
  mutation InsertCard($card: cards_insert_input!) {
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

@Injectable()
export class HolderStoreEffects {
  constructor(private actions$: Actions, private _apollo: Apollo) {}

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
      exhaustMap(() => {
        const qo: QueryOptions = {
          query: QUERY_LOAD_USER_CARDS,
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
            console.log(e)
          }),
        );
      })
    ));
}
