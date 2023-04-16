import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUserCards} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCardsList} from "../store/holder-store.selectors";
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy {
  private _favoriteCards: Card[] = [];
  private _unfavoriteCards: Card[] = [];
  private _unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectCardsList).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this._favoriteCards = data.filter((card) => card.is_favorite);
        this._unfavoriteCards = data.filter((card) => !card.is_favorite);
      }
      console.log('in list ' ,data);
    })
    this.store.dispatch(loadUserCards());
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
