import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./modules/main/main-page/main-page.component";
import {CardFormComponent} from "./modules/holder/card-form/card-form.component";
import {CardsListComponent} from "./modules/holder/cards-list/cards-list.component";

const routes: Routes = [
  { path: '', component: CardsListComponent},
  { path: 'new', component: CardFormComponent},
  { path: 'edit/:uuid', component: CardFormComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
