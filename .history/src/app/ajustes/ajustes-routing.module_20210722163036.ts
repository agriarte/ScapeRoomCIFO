import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AjustesPage } from './ajustes.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule],
  exports: [RouterModule],
})
export class AjustesPageRoutingModule { }
