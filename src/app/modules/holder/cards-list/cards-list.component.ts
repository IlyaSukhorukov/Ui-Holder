import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUserCards} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCardsList} from "../store/holder-store.selectors";
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  public isListView = false;
  public favoriteCards: Card[] = [];
  public unfavoriteCards: Card[] = [];

  constructor(private _store: Store) {
  }

  ngOnInit(): void {
    this.subscribeOnCardsList();
    this._store.dispatch(loadUserCards());
  }

  subscribeOnCardsList(): void {
    this._store.select(selectCardsList).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this.favoriteCards = data.filter((card) => card.is_favorite);
        this.unfavoriteCards = data.filter((card) => !card.is_favorite);
      }
      console.log('in list ' ,data);
    })
  }

  onToggleChange($event: MatSlideToggleChange): void{
    this.isListView = $event.checked;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
