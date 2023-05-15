import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { exhaustMap, map, tap } from 'rxjs/operators';
import {Apollo, gql} from "apollo-angular";
import {
  addFriend,
  cardCreated,
  cardLoaded, cardUpdated,
  createCard, deleteRelation, familyLoaded, friendAdded,
  loadCard, loadFamily, loadRequests, loadSubscribers,
  loadUser,
  loadUserCards, relationDeleted, relationUpdated, requestsLoaded, subscribersLoaded, updateCard, updateRelation,
  UserCardsLoaded, userLoaded
} from "./holder-store.actions";
import {Card, FriendRequest, User} from "./schema";
import {MutationOptions, QueryOptions} from "@apollo/client/core";
import {omit} from "lodash";

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

const MUTATION_ADD_CARD = gql`
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

const MUTATION_ADD_FRIEND = gql`
  mutation ($request: family_insert_input!) {
    insert_family_one(object: $request) {
      from
      to
      status
    }
  }
`

const generateQueryLoadToByStatus = (id: string, status: string): string => `
  query {
      family(where: {to: {_eq: "${id}"}, status: {_eq: "${status}"}}) {
        from
        status
        to
        uuid
        timestamp
      }
  }
`

const generateQueryLoadSubscribes = (id: string, status: string): string => `
  query {
      family(where: {from: {_eq: "${id}"}, status: {_eq: "${status}"}}) {
        from
        status
        to
        uuid
        timestamp
      }
  }
`

const generateQueryLoadFamily = (id: string): string => `
  query {
      family(where: {_or: [
        {from: {_eq: "${id}"}, status: {_eq: "family"}},
        {to: {_eq: "${id}"}, status: {_eq: "family"}}
      ]}) {
        from
        status
        to
        uuid
        timestamp
      }
  }
`

const generateMutationDeleteRelation = (uuid: string): string => `
  mutation {
      delete_family_by_pk(uuid: "${uuid}") {
        uuid
      }
  }
`

const generateMutationUpdateRelationStatus = (uuid: string, status: string): string => `
  mutation {
  update_family(where: {uuid: {_eq: "${uuid}"}},
    _set: {status: "${status}"}) {
    returning {
      from
      status
      to
      uuid
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
          query: MUTATION_ADD_CARD,
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

  $addFriend = createEffect(() =>
    this.actions$.pipe(
      ofType(addFriend),
      exhaustMap(({ request }) => {
        const rq = omit(request, ['uuid']);
        const mutationOptions: MutationOptions = {
          mutation: MUTATION_ADD_FRIEND,
          variables: {
            request: rq
          },
          fetchPolicy: 'no-cache',
        }
        return this._apollo.mutate<{request: FriendRequest}>(mutationOptions).pipe(
          // @ts-ignore
          map(({data}) => friendAdded({request: JSON.parse(JSON.stringify(data['insert_family_one']))})),
        );
      })
    ));

  $loadRequests = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRequests),
      exhaustMap(({ uuid }) => {
        const queryOptions: QueryOptions = {
          query: gql`${generateQueryLoadToByStatus(uuid, 'request')}`,
          fetchPolicy: 'no-cache',
        }
        return this._apollo.query<{request: FriendRequest}>(queryOptions).pipe(
          // @ts-ignore
          map(({data}) => requestsLoaded({requests: JSON.parse(JSON.stringify(data['family']))})),
        );
      })
    ));

  $loadSubscribers = createEffect(() =>
  this.actions$.pipe(
    ofType(loadSubscribers),
    exhaustMap(({ uuid }) => {
      const queryOptions: QueryOptions = {
        query: gql`${generateQueryLoadSubscribes(uuid, 'subscriber')}`,
        fetchPolicy: 'no-cache',
      }
      return this._apollo.query<{request: FriendRequest}>(queryOptions).pipe(
        // @ts-ignore
        map(({data}) => subscribersLoaded({subscribers: JSON.parse(JSON.stringify(data['family']))})),
      );
    })
  ));

  $loadFamily = createEffect(() =>
  this.actions$.pipe(
    ofType(loadFamily),
    exhaustMap(({ uuid }) => {
      const queryOptions: QueryOptions = {
        query: gql`${generateQueryLoadFamily(uuid)}`,
        fetchPolicy: 'no-cache',
      }
      return this._apollo.query<{request: FriendRequest}>(queryOptions).pipe(
        // @ts-ignore
        map(({data}) => familyLoaded({family: JSON.parse(JSON.stringify(data['family']))})),
      );
    })
  ));

  $deleteRelation = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteRelation),
    exhaustMap(({ uuid }) => {
      const mutationOptions: MutationOptions = {
        mutation: gql`${generateMutationDeleteRelation(uuid)}`,
        fetchPolicy: 'no-cache',
      }
      return this._apollo.mutate<{request: FriendRequest}>(mutationOptions).pipe(
        // @ts-ignore
        map(({data}) => relationDeleted({uuid: JSON.parse(JSON.stringify(data['delete_family_by_pk'].uuid))})),
        tap((e) => {
          console.log('updated ',e);
        }),
      );
    })
  ));

  $updateRelation = createEffect(() =>
  this.actions$.pipe(
    ofType(updateRelation),
      exhaustMap(({ uuid, status }) => {
      const mutationOptions: MutationOptions = {
        mutation: gql`${generateMutationUpdateRelationStatus(uuid, status)}`,
        fetchPolicy: 'no-cache',
      }
      return this._apollo.mutate<{request: FriendRequest}>(mutationOptions).pipe(
        // @ts-ignore
        map(({data}) => relationUpdated({uuid: JSON.parse(JSON.stringify(data['update_family']['returning'][0]))})),
        tap((e) => {
          console.log('updated ',e);
        }),
      );
    })
  ));
}
