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
  markers = [ ];

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

    this.markers =[
    {
      position: new google.maps.LatLng(40.513493, -3.349011,),
      map: this.map,
      title: 'Marker 1'
    },
    {
      position: new google.maps.LatLng(32.06485, 34.763226),
      map: this.map,
      title: 'Marker 2'
    }];
  };

  showmap(){
    const location = new google.maps. LatLng(40.5053455, -3.3481092);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     //Default Marker
    const marker = new google.maps.Marker({
    position: location,
    map: this.map,
    title: 'Hello World!'
  });

    //Adding other markers
    this.loadAllMarkers();
  }

 getAllStations() {
    //Get saved list of stations
    this.apiDataService.getListStations().subscribe(response => {
      this.listStations = response;
    });
  };

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({markerInfo });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

}
