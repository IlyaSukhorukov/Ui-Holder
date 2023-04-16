import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import {StoreModule} from "@ngrx/store";
import {cardsReducer} from "./store/holder-store.reducers";
import {HolderStoreEffects} from "./store/holder-store.effects";
import {EffectsModule} from "@ngrx/effects";



@NgModule({
  declarations: [
    CardsListComponent
  ],
  exports: [
    CardsListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({cards: cardsReducer}),
    EffectsModule.forFeature([HolderStoreEffects]),
  ]
})
export class HolderModule { }
