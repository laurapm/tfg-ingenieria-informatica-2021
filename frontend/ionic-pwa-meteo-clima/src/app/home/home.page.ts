/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiDataService } from '../services/api-data';
import { HttpClient } from '@angular/common/http';
import { Station } from 'src/app/model/station';
import { StationSensors } from 'src/app/model/station-sensors';
import { Position, PositionOptions } from '@capacitor/geolocation';
import { async, waitForAsync } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  map: any;
  markers = [];
  listStations;
  station: Station;
  sensors: StationSensors;
  position: any = null;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(public apiDataService: ApiDataService, public http: HttpClient, public geolocation: Geolocation) {
    this.listStations = this.getAllStations();
  }

  ionViewWillEnter() {
    this.showmap();
    this.loadAllMarkers();
  }

  showmap() {
    // this.listStations = this.getAllStations();
    // console.log('lista estaciones: ', this.listStations);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.position = resp.coords;
      this.listStations = this.getAllStations();
      this.displayMap(resp.coords.latitude, resp.coords.longitude);
    });
    //this.displayMap();
  }

  displayMap(latitude, longitude){
    const location = new google.maps.LatLng(latitude, longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.createMarkers();

    //Adding other markers
    this.loadAllMarkers();
  }

  getAllStations(): Promise<Station[]> {
    console.log('llamado getAllStations');
    //Get saved list of station
    this.apiDataService.getListStations().subscribe((data: Station[]) => {
      this.listStations = data;
    });
    return this.listStations;
  }

  getInfoStation(id: number): StationSensors {
    let stationInfo: StationSensors = null;
    this.apiDataService.getStationInfo(id).subscribe((data: StationSensors) => {
      stationInfo = data;
    });
    return stationInfo;
  }

  loadAllMarkers(): void {
    this.markers.forEach((markerInfo) => {
      //Creating a new marker object
      const marker = new google.maps.Marker({ markerInfo });
      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

  createMarkers() {
    for (const station of this.listStations) {
      console.log('Creando marcador para la estacion', station);

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(station.latitude, station.longitude),
        map: this.map,
        title: station.name,
      });

      let stationInfo;
      this.apiDataService
        .getStationInfo(station.id)
        .subscribe((data: StationSensors) => {
          stationInfo = data;
          const markerInfo =
            '<div class=divmap>' +
            '<p style="color:#FF0000; font-weight: bold">' +
            stationInfo.nameStation +
            '</p>' +
            '<p>Sensores de la estacion: ' +
            stationInfo.listSensors.toString() +
            ';</p>' +
            '</div>';

          // Create an info window to share between markers.
          const infoWindow = new google.maps.InfoWindow();
          //Add click event to open info window on marker
          // Add a click listener for each marker, and set up the info window.
          marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(markerInfo);
            infoWindow.open(marker.getMap(), marker);
          });
        });

      this.markers.push(marker);
    }
  }
}
