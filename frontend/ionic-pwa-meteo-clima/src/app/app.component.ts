import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
declare let $: any;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  activePageTitle = 'Dashboard';

  pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'mail'
    }
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    $('body').addClass('df');
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
}
