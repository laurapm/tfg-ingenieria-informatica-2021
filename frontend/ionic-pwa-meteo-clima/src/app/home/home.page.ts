/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiDataService } from '../services/api-data';
import { HttpClient } from '@angular/common/http';
import { Station } from 'src/app/model/station';
import { StationSensors } from 'src/app/model/station-sensors';
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
  position: any = null;

  listStations;
  station: Station;

  sensors: StationSensors;
  listSensorsName;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(
    public apiDataService: ApiDataService,
    public http: HttpClient,
    public geolocation: Geolocation
  ) {
    this.listStations = this.getAllStations();
  }

  ionViewWillEnter() {
    this.showmap();
    this.loadAllMarkers();
  }

  getAllStations(): Promise<Station[]> {
    //Get saved list of station
    this.apiDataService.getListStations().subscribe((data: Station[]) => {
      this.listStations = data;
    });
    return this.listStations;
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

  displayMap(latitude, longitude) {
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

  createMarkers() {
    for (const station of this.listStations) {
      // console.log('Creando marcador para la estacion', station);

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(station.latitude, station.longitude),
        map: this.map,
        title: station.name,
        draggable: true,
        raiseOnDrag: true,
        labelContent: '$425K',
        labelAnchor: new google.maps.Point(22, 0),
        labelStyle: { opacity: 0.75 },
      });

      let stationInfo;
      this.apiDataService
        .getStationInfo(station.id)
        .subscribe((data: StationSensors) => {
          stationInfo = data;

          let color = '#FF5733';
          if (stationInfo.listSensors.length >= 5) {
            color = '#5DADE2';
          }
          /*const markerInfo =
            '<div class=divmap>' +
            '<p style="color:' +
            color +
            '; font-weight: bold">' +
            stationInfo.nameStation +
            '</p>' +
            '<p>Sensores de la estacion: <br>' +
            stationInfo.listSensors
              .toString()
              .replaceAll(',', '    ')
              .trimEnd() +
            ';</p>' +
            '<button onclick="presentModal()">Click me</button>' +
            '</div>' +
            ;*/

          const link = 'station-details/' + station.id;
          const markerInfo =
            '<div class=divmap>' +
            '<p style= "color:' +
            color +
            '"> Nombre de la estación: ' +
            stationInfo.nameStation +
            ';</p>' +
            '<p>Localización GPS: ' +
            station.latitude +
            ', ' +
            station.longitude +
            ';</p>' +
            '<p><a href=' +
            link +
            '> Más información </a>;</p>' +
            '</div>';

          // Create an info window to share between markers.
          const infoWindow = new google.maps.InfoWindow();
          marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(markerInfo);
            infoWindow.open(marker.getMap(), marker);
          });
        });

      this.markers.push(marker);
    }
  }

  loadAllMarkers(): void {
    this.markers.forEach((markerInfo) => {
      //Creating a new marker object
      const marker = new google.maps.Marker({ markerInfo });
      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

  getInfoStation(id: number): StationSensors {
    let stationInfo: StationSensors = null;
    this.apiDataService.getStationInfo(id).subscribe((data: StationSensors) => {
      stationInfo = data;
    });
    return stationInfo;
  }
}
