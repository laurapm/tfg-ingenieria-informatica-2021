import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-station',
  templateUrl: './register-station.page.html',
  styleUrls: ['./register-station.page.scss'],
})
export class RegisterStationPage implements OnInit {

  fields = [
    {
      fieldName: 'Name',
      type: 'text',
      value: ''
    },
    {
      fieldName: 'Country',
      type: 'text',
      value: ''
    },
    {
      fieldName: 'City',
      type: 'text',
      value: ''
    },
    {
      fieldName: 'Latitude',
      type: 'numeric',
      value: ''
    },

    {
      fieldName: 'Longitude',
      type: 'numeric',
      value: ''
    },
  ];

  sensors = [
    { val:  'Temperature' , isChecked: false },
    { val:  'Humidity'    , isChecked: false },
    { val:  'Raining'     , isChecked: false },
    { val:  'UV'          , isChecked: false },
    { val:  'Ozone'       , isChecked: false },
    { val:  'Wind'        , isChecked: false },
    { val:  'Preassure'   , isChecked: false }
  ];

  sensorOptions: string[] = [
      'Temperature' , 'Humidity', 'Raining',
      'UV', 'Ozone', 'Wind', 'Preassure'];

   contactForm = new FormGroup({
      sensors: new FormArray([])
    });

  constructor(public toastController: ToastController) {
    this.sensors.forEach(() =>
      this.ordersFormArray.push(new FormControl(false))
    );
  }

  get ordersFormArray() {
    return this.contactForm.controls.sensors as FormArray;
  }

  createStation(  ){
      const name =  this.fields[0].value;
      const country = this.fields[1].value;
      const city = this.fields[2].value;

      const lat =  this.fields[3].value;
      const long = this.fields[4].value;

      const sensorsList = [];
      this.sensors.forEach(sensor => {
        if (sensor.isChecked){
          sensorsList.push(sensor.val);
        }
      });

    console.log('Call endpoint to create station with data {name: '
     + name + ' , country: '  + country + ' , city: ' + city + ' , latitude: ' + lat + ' , longitude: '
      + long + ' , list of sensors:  [' + sensorsList + '] }');
  }

  async sendNotification() {
    const toast = await this.toastController.create({
      message: 'The station has been created correctly',
      duration: 4000,
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  ngOnInit() {

  }

}
