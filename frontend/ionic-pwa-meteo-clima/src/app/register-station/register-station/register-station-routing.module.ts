import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterStationPage } from './register-station.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterStationPageRoutingModule {}
