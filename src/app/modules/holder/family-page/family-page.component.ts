import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Relations} from "../store/schema";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import { selectFamily, selectRequests, selectSubscribers } from "../store/holder-store.selectors";
import {isEmpty, isNil} from "lodash";
import {deleteRelation, loadFamily, loadRequests, loadSubscribers, updateRelation} from "../store/holder-store.actions";
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyPageComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  public requests: Relations[] = [];
  public family: Relations[] = [];
  public subscribers: Relations[] = [];

  constructor(private _store: Store, private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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
      if (!isEmpty(data)) {
        this.subscribers = data;
        this._cd.markForCheck();
      }
    });
  }

  public onDelete(uuid: string | null): void {
    if (!isNil(uuid)) {
      this._store.dispatch(deleteRelation({ uuid }));
    }
  }

  public onChangeStatus(uuid: string | null) {
    if (!isNil(uuid)) {
      this._store.dispatch(updateRelation({uuid, status: 'family'}));
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
