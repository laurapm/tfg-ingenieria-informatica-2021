/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor() { }

  ionViewDidEnter(){
    this.showmap();
  }

  showmap(){
    const location = new google.maps. LatLng(40.5053455, -3.3481092);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}
