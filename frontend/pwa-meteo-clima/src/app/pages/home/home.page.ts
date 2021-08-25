/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import { HttpClient } from '@angular/common/http';
declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  map: any;
  listStations: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(
        public apiDataService: ApiDataService,
        public http: HttpClient
  ) {
   this.listStations = [];
  }

  ionViewDidEnter(){
    this.showmap();
  };

  showmap(){
    const location = new google.maps. LatLng(40.5053455, -3.3481092);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.getAllStations();
  }

 getAllStations() {
    //Get saved list of stations
    this.apiDataService.getListStations().subscribe(response => {
      console.log(response);
      this.listStations = response;
    });
  }

}
