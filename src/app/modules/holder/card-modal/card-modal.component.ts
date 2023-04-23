import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string, name: string },
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
