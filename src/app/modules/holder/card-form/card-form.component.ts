import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {isEmpty, isNil} from "lodash";
import {Store} from "@ngrx/store";
import {createCard, loadCard} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {selectCard} from "../store/holder-store.selectors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {ScanModalComponent} from "../scan-modal/scan-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CURRENT_USER_UUID} from "../../../core/default-values";

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

  constructor(private _router: Router, private _route: ActivatedRoute, private _store: Store, private _fb: FormBuilder, public dialog: MatDialog) {
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
      const updatedCard = this.patchDefaultValues();
      this._store.dispatch(createCard({ card: updatedCard }));
      this._router.navigate(['.*']);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private patchDefaultValues(): Card {
    if (isEmpty(this.formGroup.getRawValue().type)) {
      this.formGroup.patchValue({type: 'other'});
    }
    if (isEmpty(this.formGroup.getRawValue().access)) {
      this.formGroup.patchValue({access: 'private'});
    }
    const updatedCard = this.formGroup.getRawValue();
    delete updatedCard.id;
    updatedCard.id_user = CURRENT_USER_UUID;
    return updatedCard;
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
