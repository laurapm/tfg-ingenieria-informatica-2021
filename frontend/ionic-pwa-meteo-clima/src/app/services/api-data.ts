import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Station} from '../model/station';
import { StationSensors } from '../model/station-sensors';

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
