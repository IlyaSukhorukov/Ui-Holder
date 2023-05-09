import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {isNil} from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder} from "@angular/forms";
import {selectUser} from "../store/holder-store.selectors";
import {User} from "../store/schema";
import {loadUser} from "../store/holder-store.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject<void>();

  public currentUser: User | null = null;

  public user_id: string | null = null;

  constructor(private _router: Router, private _route: ActivatedRoute, private _store: Store, private _fb: FormBuilder) {
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
        console.log(this.currentUser);
      }
    });
  }

  subscribeOnParam(): void {
    this._route.paramMap.pipe(takeUntil(this._unsubscribe$)).subscribe((params) => {
      this.user_id = params.get('id');
      if (!isNil(this.user_id)) {
        console.log(this.user_id);
        this._store.dispatch(loadUser({public_id: this.user_id}));
        // this._store.dispatch(loadCard({uuid: this.user_id}));
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
