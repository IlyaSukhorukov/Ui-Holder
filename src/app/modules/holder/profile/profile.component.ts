import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {isNil} from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder} from "@angular/forms";
import {selectUser} from "../store/holder-store.selectors";
import {Card, Relations, User} from "../store/schema";
import {addFriend, loadUser} from "../store/holder-store.actions";
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject<void>();

  public currentUser: User | null = null;
  public user_id: string | null = null;
  public unfavoriteCards: Card[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    /*this.formGroup = this._fb.group({...new Card});
    this._setFormGroup();*/
  }

  ngOnInit(): void {
    this.subscribeOnProfile();
    this.subscribeOnParam();
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
        // this._store.dispatch(loadCard({uuid: this.user_id}));
      }
    });
  }

  private createRequest(): Relations {
    return {
      uuid: null,
      from: CURRENT_USER_PUBLIC_ID,
      to: this.user_id || '',
      status: 'request',
      timestamp: null,
    };
  }

  public isMyProfile(): boolean {
    return this.user_id === CURRENT_USER_PUBLIC_ID;
  }

  public onAddFriend(): void {
    this._store.dispatch(addFriend({request: this.createRequest()}));

    this._snackBar.open(
      "Запрос на добавление в друзья отправлен",
      "Закрыть",
      {
        duration: 3000
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
