import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiDataService } from '../services/api-data';
import { StationSensors } from '../model/station-sensors';

// Chart imports
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  id: number;
  name: string;

  showTemperature = false;
  showHumidity = false;
  showRaining = false;
  showUV = false;
  showOzone = false;
  showWind = false;


  // Data temperature
  chartData: ChartDataSets[] = [{ data: [], label: 'temperatura (ºC)' }];
  chartLabes: Label[];

  // Data humidity
  chartDataH: ChartDataSets[] = [{ data: [], label: 'humedad (%)' }];
  chartLabesH: Label[];

  // Data raining
  chartDataR: ChartDataSets[] = [{ data: [], label: 'lluvia (m2)' }];
  chartLabesR: Label[];

  // Data UV
  chartDataUV: ChartDataSets[] = [{ data: [], label: 'indice uv' }];
  chartLabesUV: Label[];

  // Data Ozone
  chartDataO: ChartDataSets[] = [{ data: [], label: 'ozono (mg/m3)' }];
  chartLabesO: Label[];

  // Data Wind
 chartDataW: ChartDataSets[] = [{ data: [], label: 'viento (m/s)' }];
 chartLabesW: Label[];

  // Options
  options: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
    },
    scales:{
      xAxes: [
        {
          type: 'time',
        }
      ],
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x',
        }
      }
    },
  };
  chartColorsTemp: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff',
    },
  ];
  chartColorsHum: Color[] = [
    {
      borderColor: '#2980B9',
      backgroundColor: '#5DADE2',
    },
  ];
  chartColorsRain: Color[] = [
    {
      borderColor: '#154360',
      backgroundColor: '#21618C',
    },
  ];
  chartColorsUV: Color[] = [
    {
      borderColor: '#4A235A',
      backgroundColor: '#7D3C98',
    },
  ];
  chartColorsOzone: Color[] = [
    {
      borderColor: '#D68910',
      backgroundColor: '#F5B041',
    },
  ];
  chartColorsWind: Color[] = [
    {
      borderColor: '#424949',
      backgroundColor: '#7B7D7D',
    },
  ];

  chartType = 'line';


  constructor(
    private route: ActivatedRoute,
    public apiDataService: ApiDataService,
    private http: HttpClient
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log('id', this.id);
      this.getDataTemperature(this.id);
      this.getDataHumidity(this.id);
      this.getDataRaining(this.id);
    });
  }

  getDataTemperature(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          1
      )
      .subscribe((res) => {
        this.chartData[0].data = [];
        this.chartLabes = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabes.push(element.date);
              this.chartData[0].data.push(element.value);
            }
          });
        });
        console.log('Dat Temperature: ', this.chartData);
      });
  }

  getDataHumidity(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          2
      )
      .subscribe((res) => {
        this.chartDataH[0].data = [];
        this.chartLabesH = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabesH.push(element.date);
              this.chartDataH[0].data.push(element.value);
            }
          });
        });
        console.log('Data Humidity: ', this.chartDataH);
      });
  }

  getDataRaining(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          3
      )
      .subscribe((res) => {
        this.chartDataR[0].data = [];
        this.chartLabesR = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabesR.push(element.date);
              this.chartDataR[0].data.push(element.value);
            }
          });
        });
        console.log('Raining probability: ', this.chartDataR);
      });
  }

  getDataUV(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          4
      )
      .subscribe((res) => {
        this.chartDataUV[0].data = [];
        this.chartLabesUV = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabesUV.push(element.date);
              this.chartDataUV[0].data.push(element.value);
            }
          });
        });
        console.log('Raining probability: ', this.chartDataUV);
      });
  }

  getDataOzone(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          5
      )
      .subscribe((res) => {
        this.chartDataO[0].data = [];
        this.chartLabesO = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabesO.push(element.date);
              this.chartDataO[0].data.push(element.value);
            }
          });
        });
        console.log('Raining probability: ', this.chartDataO);
      });
  }

  getDataWind(stationId) {
    this.http
      .get(
        'http://localhost:8081/meteoclima//measurements-station-sensor?stationId=' +
          stationId +
          '&sensorId=' +
          6
      )
      .subscribe((res) => {
        this.chartDataW[0].data = [];
        this.chartLabesW = [];

        Object.entries(res).map((entry) => {
          entry.forEach((element) => {
            if (element !== undefined && element.value !== undefined) {
              this.chartLabesW.push(element.date);
              this.chartDataW[0].data.push(element.value);
            }
          });
        });
        console.log('Raining probability: ', this.chartDataW);
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
    });

    this.apiDataService
      .getStationInfo(this.id)
      .subscribe((data: StationSensors) => {
        this.name = data.nameStation;
      });
  }

  displayTemperature(){
    this.showTemperature = !this.showTemperature;
  };

  displayHumidity(){
    this.showHumidity = !this.showHumidity;
  };

  displayRaining(){
    this.showRaining = !this.showRaining;
  };

  displayUV(){
    this.showUV = !this.showUV;
  };

  displayOzone(){
    this.showOzone = !this.showOzone;
  };

  displayWindy(){
    this.showWind = !this.showWind;
  };

}
