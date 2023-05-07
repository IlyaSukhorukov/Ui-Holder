import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";
import {Store} from "@ngrx/store";
import {loadCard} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCard} from "../store/holder-store.selectors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {ScanModalComponent} from "../scan-modal/scan-modal.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private _route: ActivatedRoute, private _store: Store, private _fb: FormBuilder, public dialog: MatDialog) {
    this.formGroup = this._fb.group({...new Card});
    this._setFormGroup();
  }

  private _setFormGroup(): void {
    this.formGroup.get("name")?.setValidators(Validators.required);
    this.formGroup.get("code")?.setValidators(Validators.required);
    this.formGroup.patchValue({access: 'private'});
    this.formGroup.patchValue({type: 'other'});
  }

  ngOnInit(): void {
    this.subscribeOnCard();
    this.subscribeOnParam();
    this.subscribeOnParamChange(); // TODO check не работает
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

  subscribeOnParamChange(): void {
    this.formGroup.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe(($event) => {
      // this.formGroup.markAllAsTouched();
    });
  }

  onCreate(): void {
    if (this.formGroup.valid) {
      if (isEmpty(this.formGroup.getRawValue().type)) {
        this.formGroup.patchValue({type: 'other'});
      }
      if (isEmpty(this.formGroup.getRawValue().access)) {
        this.formGroup.patchValue({access: 'private'});
      }
      console.log(this.formGroup.getRawValue());
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onScan(): void {
    console.log('oy hi!')
    const dialogRef = this.dialog.open(ScanModalComponent, {
      width: '50em',
      maxWidth: '69em',
      maxHeight: '50em',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {
        this.formGroup.patchValue({ code: result });
      }
    });
  }

  isShowScanIcon(): boolean {
    let result = false;
    const type = this.formGroup.getRawValue().type;
    if (type === 'qr' || type === 'bc'){
      result = true;
    }
    return result;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
