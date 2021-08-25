import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Station} from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  url = 'http://localhost:8080/meteoclima';

  constructor(public http: HttpClient){
  }

  getListStations(): Observable<any>{
    return this.http
    .get<Station>(this.url+'/stations');
  }
}
