import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { isEmpty } from "lodash";
import {Store} from "@ngrx/store";
import {deleteCard} from "../store/holder-store.actions";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent {

  constructor(
    private _store: Store,
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string, name: string, code: string, description: string, type: string },
  ) {}

  hasDescription(): boolean {
    return !isEmpty(this?.data?.description);
  }

  isOtherType(): boolean {
    return this?.data?.type !== 'bc' && this?.data?.type !== 'qr';
  }

  onDelete(): void {
    this._store.dispatch(deleteCard({ uuid: this.data.uuid }));
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
