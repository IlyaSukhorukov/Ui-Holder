import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import {StoreModule} from "@ngrx/store";
import {HolderStoreEffects} from "./store/holder-store.effects";
import {EffectsModule} from "@ngrx/effects";
import {cardsReducer, metaReducers, stateFeatureKey} from "./store";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { CardFormComponent } from './card-form/card-form.component';
import {RouterModule} from "@angular/router";
import { CardModalComponent } from './card-modal/card-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { ProfileComponent } from './profile/profile.component';
import {NgxBarcodeModule} from "ngx-barcode";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {ReactiveFormsModule} from "@angular/forms";
import { ScanModalComponent } from './scan-modal/scan-modal.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";

@NgModule({
  declarations: [
    CardsListComponent,
    CardFormComponent,
    CardModalComponent,
    ProfileComponent,
    ScanModalComponent
  ],
  exports: [
    CardsListComponent
  ],
    imports: [
        CommonModule,
        StoreModule.forFeature(stateFeatureKey, cardsReducer, {metaReducers}),
        EffectsModule.forFeature([HolderStoreEffects]),
        MatCardModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxBarcodeModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
        ZXingScannerModule,
    ]
})
export class HolderModule { }
