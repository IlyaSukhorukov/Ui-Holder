import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadSubsId, loadUserCards} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCardsList, selectSubsId} from "../store/holder-store.selectors";
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatDialog} from "@angular/material/dialog";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {CURRENT_USER_PUBLIC_ID, CURRENT_USER_UUID} from "../../../core/default-values";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  public isListView = false;
  public cards: Card[] = [];

  public subsId: string[] = [];

  constructor(private _store: Store, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscribeOnCardsList();
    this.subscribeOnSubsId();
    this._store.dispatch(loadSubsId({ uuid: CURRENT_USER_PUBLIC_ID }));
  }

  subscribeOnCardsList(): void {
    this._store.select(selectCardsList).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this.cards = data;
      }
    });
  }

  subscribeOnSubsId(): void {
    this._store.select(selectSubsId).pipe(takeUntil(this._unsubscribe$)).subscribe((data) => {
      if (!isEmpty(data)) {
        this.subsId = data;
        this._store.dispatch(loadUserCards({ ids: this.subsId }));
      }
    });
  }

  onToggleChange($event: MatSlideToggleChange): void{
    this.isListView = $event.checked;
  }

  onCardClick(uuid: string, name: string, code: string, description: string, type: string): void {
    // console.log(uuid);
    const dialogRef = this.dialog.open(CardModalComponent, {
      /*minWidth: '20%',
      maxWidth: '90%',
      maxHeight: '90%',
      minHeight: '20%',*/
      width: '50em',
      maxWidth: '69em',
      maxHeight: '50em',
      data: {
        uuid,
        name,
        code,
        description,
        type
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
