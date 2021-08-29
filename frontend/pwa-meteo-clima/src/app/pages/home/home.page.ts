/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { HttpClient } from '@angular/common/http';
import { Station } from 'src/app/models/station';
import { MapMarker } from 'src/app/models/map-marker';
import { StationSensors } from 'src/app/models/station-sensors';
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

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(public apiDataService: ApiDataService, public http: HttpClient) {
    this.listStations = this.getAllStations();
  }
  ionViewWillEnter() {
    this.showmap();
    this.loadAllMarkers();
  }

  showmap() {
    const location = new google.maps.LatLng(40.5053455, -3.3481092);
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

  getAllStations(): Station[] {
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
