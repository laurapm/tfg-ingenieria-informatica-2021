import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiDataService } from '../services/api-data';
import { StationSensors } from '../model/station-sensors';

// Chart imports
import { ChartDataSets} from 'chart.js';
import {Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  id: number;
  name: string;

  // Data
  chartData: ChartDataSets[]=[
    {data: [], label: 'temperature'}
  ];

  chartLabes: Label[];

  // Options
  chartOptions = {
    responsive: true,
    tittle: {
      display: true,
      text: 'Temperatura registrada en la estación'
    },
    pan: {
      enable: true,
      mode: 'xy'
    },
    zoom: {
      enable: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];

  chartType = 'line';
  showlegend = false;

  // For search
  stock = 'AAPL';

  constructor( private route: ActivatedRoute, public apiDataService: ApiDataService, private http: HttpClient) {
    this.getData(1, 1);
  }

  getData(stationId, sensorId){
      this.http.get('http://localhost:8081/meteoclima//measurements-station-sensor?stationId='+
      stationId +'&sensorId=' + sensorId).subscribe( res =>{
        this.chartData[0].data = [];
        this.chartLabes = [];

        Object.entries(res).map(entry => {
         entry.forEach(element => {
           if (element !== undefined && element.value!== undefined){
            this.chartLabes.push(element.date);
            this.chartData[0].data.push(element.value);
           }
         });
        });
        console.log('Data: ', this.chartData);
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.id = +params.get('id');
    });

    this.apiDataService
    .getStationInfo(this.id)
    .subscribe((data: StationSensors) => {
      this.name = data.nameStation;
    });
  }

  ionViewDidEnter() {
  }

  barChartMethod() { }
}
