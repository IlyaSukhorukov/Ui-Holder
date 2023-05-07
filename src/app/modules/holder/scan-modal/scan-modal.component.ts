import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {BarcodeFormat} from "@zxing/browser";

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.component.html',
  styleUrls: ['./scan-modal.component.scss']
})
export class ScanModalComponent {

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];
  public qrResultString: string = '';

  constructor(
    public dialogRef: MatDialogRef<ScanModalComponent>,
  ) {
  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.qrResultString);
  }
}
