import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Station} from '../models/station';
import { StationSensors } from '../models/station-sensors';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
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
}
