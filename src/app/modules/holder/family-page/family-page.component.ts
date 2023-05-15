import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendRequest} from "../store/schema";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {selectCardsList, selectFamily, selectRequests, selectSubscribers} from "../store/holder-store.selectors";
import {isEmpty} from "lodash";
import {loadFamily, loadRequests, loadSubscribers} from "../store/holder-store.actions";
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})
export class FamilyPageComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  public requests: FriendRequest[] = [];
  public family: FriendRequest[] = [];
  public subscribers: FriendRequest[] = [];

  constructor(private _store: Store) {
  }

  ngOnInit(): void {
    /*this.subscribeOnCardsList();
    this._store.dispatch(loadUserCards({id: CURRENT_USER_PUBLIC_ID}));*/
    this.subscribeOnRequests();
    this.subscribeOnFamily();
    this.subscribeOnSubscribers();

    this._store.dispatch(loadRequests({uuid: CURRENT_USER_PUBLIC_ID}));
    this._store.dispatch(loadFamily({uuid: CURRENT_USER_PUBLIC_ID}));
    this._store.dispatch(loadSubscribers({uuid: CURRENT_USER_PUBLIC_ID}));
  }

  subscribeOnRequests(): void {
    this._store.select(selectRequests).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this.requests = data;
      }
    });
  }
  subscribeOnFamily(): void {
    this._store.select(selectFamily).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this.family = data;
      }
    });
  }
  subscribeOnSubscribers(): void {
    this._store.select(selectSubscribers).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      console.log(data)
      if (!isEmpty(data)) {
        this.subscribers = data;
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
