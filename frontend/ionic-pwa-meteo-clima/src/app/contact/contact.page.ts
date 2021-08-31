import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  fields = [
    {
      fieldName: 'Name',
      type: 'text',
    },
    {
      fieldName: 'Surname',
      type: 'text',
    },
    {
      fieldName: 'Phone',
      type: 'numeric',
    },
    {
      fieldName: 'Email',
      type: 'email',
    }
  ];

  constructor(public toastController: ToastController) { }
  async sendNotification() {
    const toast = await this.toastController.create({
      message: 'The email has been sent',
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
