import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder} from "@angular/forms";
import {selectCardsList, selectUser} from "../store/holder-store.selectors";
import {Card, Relations, User} from "../store/schema";
import {addFriend, clean, loadPublicUserCards, loadUser } from "../store/holder-store.actions";
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject<void>();

  public currentUser: User | null = null;
  public user_id: string | null = null;
  public cards: Card[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    /*this.formGroup = this._fb.group({...new Card});
    this._setFormGroup();*/
  }

  ngOnInit(): void {
    this._store.dispatch(clean());
    this.subscribeOnProfile();
    this.subscribeOnParam();
    this.subscribeOnPublicCards();
  }

  subscribeOnProfile(): void {
    this._store.select(selectUser).pipe(takeUntil(this._unsubscribe$)).subscribe((user) => {
      if (!isNil(user)) {
        this.currentUser = user;
      }
    });
  }

  subscribeOnParam(): void {
    this._route.paramMap.pipe(takeUntil(this._unsubscribe$)).subscribe((params) => {
      this.user_id = params.get('id');
      if (!isNil(this.user_id)) {
        this._store.dispatch(loadUser({public_id: this.user_id}));
        this._store.dispatch(loadPublicUserCards({id: this.user_id}));
        // this._store.dispatch(loadCard({uuid: this.user_id}));
      }
    });
  }

  subscribeOnPublicCards(): void {
    this._store.select(selectCardsList).pipe(takeUntil(this._unsubscribe$)).subscribe((cards) => {
      console.log(cards)
      if (!isEmpty(cards)) {
        this.cards = cards;
      }
    });
  }


  private createRequest(status: 'request' | 'family' | 'subscriber'): Relations {
    return {
      uuid: null,
      from: CURRENT_USER_PUBLIC_ID,
      to: this.user_id || '',
      status: status,
      timestamp: null,
    };
  }

  public isMyProfile(): boolean {
    return this.user_id === CURRENT_USER_PUBLIC_ID;
  }

  public onAddFriend(): void {
    this._store.dispatch(addFriend({request: this.createRequest('request')}));

    this._snackBar.open(
      "Запрос на добавление в друзья отправлен",
      "Закрыть",
      {
        duration: 3000
      });
  }

  public onSubscribe(): void {
    this._store.dispatch(addFriend({request: this.createRequest('subscriber')}));

    this._snackBar.open(
      "Вы подписались на пользователя",
      "Закрыть",
      {
        duration: 3000
      });
  }

  onCardClick(card: Card): void {
    const dialogRef = this.dialog.open(CardModalComponent, {
      width: '50em',
      maxWidth: '69em',
      maxHeight: '50em',
      data: {
        card
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
