import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {isEmpty, isNil} from "lodash";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string, name: string, code: string, description: string, type: string },
  ) {}

  hasDescription(): boolean {
    return !isEmpty(this?.data?.description);
  }

  isOtherType(): boolean {
    return this?.data?.type !== 'bc' && this?.data?.type !== 'qr';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
