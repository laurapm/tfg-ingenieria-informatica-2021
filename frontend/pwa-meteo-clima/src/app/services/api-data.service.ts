import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Station} from '../models/station';
import { StationSensors } from '../models/station-sensors';
import { Params } from '@angular/router';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Station} from '../models/station';
>>>>>>> a800e1f9fb64b5d7831d026b06582a8fb6deb017

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
<<<<<<< HEAD
  url = 'http://localhost:8081/meteoclima';

  constructor(public httpClient: HttpClient){
  }

  getListStations(): Observable<any>{
    return this.httpClient
    .get<Station>(this.url+'/stations');
  }

  getStationInfo(id: number): Observable<any>{
    return this.httpClient.get<StationSensors>(this.url + '/sensors-station'+ '?stationId=' + id);
  }
=======
  url = 'http://localhost:8080/meteoclima';

  constructor(public http: HttpClient){
  }

  getListStations(): Observable<any>{
    return this.http
    .get<Station>(this.url+'/stations');
  }
>>>>>>> a800e1f9fb64b5d7831d026b06582a8fb6deb017
}
