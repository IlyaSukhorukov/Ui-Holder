import { Component } from '@angular/core';
import {CURRENT_USER_PUBLIC_ID} from "../../../core/default-values";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public id = CURRENT_USER_PUBLIC_ID;
}
