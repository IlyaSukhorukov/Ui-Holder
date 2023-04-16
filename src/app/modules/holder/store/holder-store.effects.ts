import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, tap } from 'rxjs/operators';
import {Apollo, gql} from "apollo-angular";
import {loadUserCards, UserCardsLoaded} from "./holder-store.actions";
import {Card} from "./schema";
import {QueryOptions} from "@apollo/client/core";


const QUERY_LOAD_USER_CARDS = gql`
  query {
      cards {
          code
          id
          id_user
          is_favorite
          name
          stat_opened
      }
  }
`


@Injectable()
export class HolderStoreEffects {
  constructor(private actions$: Actions, private _apollo: Apollo) {}

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
          map(({data}) => UserCardsLoaded({list: JSON.parse(JSON.stringify(data['cards']))})),
          tap((data) => console.log(data))
        );
      })
    ));
}
