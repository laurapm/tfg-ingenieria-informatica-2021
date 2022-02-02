import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStationPageRoutingModule } from './register-station-routing.module';

import { RegisterStationPage } from './register-station.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStationPageRoutingModule
  ],
  declarations: [RegisterStationPage]
})
export class RegisterStationPageModule {}
