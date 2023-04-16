import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUserCards} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCardsList} from "../store/holder-store.selectors";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy {
  private _cards: Card[] = [];
  private _unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectCardsList).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      console.log('in list ' ,data);
    })
    this.store.dispatch(loadUserCards());
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
