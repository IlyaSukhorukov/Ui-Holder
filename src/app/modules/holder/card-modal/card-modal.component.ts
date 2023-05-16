import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { isEmpty } from "lodash";
import {Store} from "@ngrx/store";
import {deleteCard} from "../store/holder-store.actions";
import {Card} from "../store/schema";
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent {

  constructor(
    private _store: Store,
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card }, ///name: string, code: string, description: string, type: string
  ) {}

  hasDescription(): boolean {
    return !isEmpty(this?.data?.card?.description);
  }

  isOtherType(): boolean {
    return this?.data?.card?.type !== 'bc' && this?.data?.card?.type !== 'qr';
  }

  isMyCard(): boolean {
    return this.data.card?.id_user == CURRENT_USER_PUBLIC_ID;
  }

  onDelete(): void {
    this._store.dispatch(deleteCard({ uuid: this.data.card?.id }));
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
