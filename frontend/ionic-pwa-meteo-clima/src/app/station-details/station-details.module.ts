import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationDetailsPageRoutingModule } from './station-details-routing.module';

import { StationDetailsPage } from './station-details.page';
import {ChartsModule} from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationDetailsPageRoutingModule,
    ChartsModule,
  ],
  declarations: [StationDetailsPage]
})
export class StationDetailsPageModule {}
