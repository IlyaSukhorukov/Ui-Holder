import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CardFormComponent} from "./modules/holder/card-form/card-form.component";
import {CardsListComponent} from "./modules/holder/cards-list/cards-list.component";
import {ProfileComponent} from "./modules/holder/profile/profile.component";
import {FamilyPageComponent} from "./modules/holder/family-page/family-page.component";

const routes: Routes = [
  { path: '', component: CardsListComponent},
  { path: 'new', component: CardFormComponent},
  { path: 'edit/:uuid', component: CardFormComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'family', component: FamilyPageComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
