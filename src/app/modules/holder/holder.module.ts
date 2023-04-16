import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import {StoreModule} from "@ngrx/store";
import {HolderStoreEffects} from "./store/holder-store.effects";
import {EffectsModule} from "@ngrx/effects";
import {cardsReducer, metaReducers, stateFeatureKey} from "./store";



@NgModule({
  declarations: [
    CardsListComponent
  ],
  exports: [
    CardsListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(stateFeatureKey, cardsReducer, { metaReducers }),
    EffectsModule.forFeature([HolderStoreEffects]),
  ]
})
export class HolderModule { }
