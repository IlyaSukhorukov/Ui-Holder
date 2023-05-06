import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {isNil} from "lodash";
import {Store} from "@ngrx/store";
import {loadCard} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCard} from "../store/holder-store.selectors";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject<void>();
  private _uuid: string | null = null;

  public card: Card | null = null;
  public formGroup: FormGroup;

  constructor(private _route: ActivatedRoute, private _store: Store, private _fb: FormBuilder) {
    this.formGroup = this._fb.group({...new Card});
  }

  /*private static _fb(): FormGroup {
    return new FormGroup<any>({
      name: new FormControl(null),
      code: new FormControl(null),
      type: new FormControl(null),
      access: new FormControl(null),
    });
  }*/

  ngOnInit(): void {
    this.subscribeOnCard();
    this.subscribeOnParam();
  }

  subscribeOnParam(): void {
    this._route.paramMap.pipe(takeUntil(this._unsubscribe$)).subscribe((params) => {
      this._uuid = params.get('uuid');
      if (!isNil(this._uuid)) {
        this._store.dispatch(loadCard({uuid: this._uuid}));
      }
    });
  }

  subscribeOnCard(): void {
    this._store.select(selectCard).pipe(takeUntil(this._unsubscribe$)).subscribe((card) => {
      if (!isNil(card)) {
        this.card = card;
        console.log(this.card);
      }
    })
  }

  onCreate(): void {
    console.log(this.formGroup.getRawValue());
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
