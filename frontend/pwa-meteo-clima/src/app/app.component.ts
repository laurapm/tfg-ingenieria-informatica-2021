import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

<<<<<<< HEAD



=======
>>>>>>> a800e1f9fb64b5d7831d026b06582a8fb6deb017
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
<<<<<<< HEAD
  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 /*firebaseConfig = {
  apiKey: 'AIzaSyCU_vtPsSyy7djbSkKUjp48-3fFjCTF4cE',
  authDomain: 'estacionesmeteo-tfg.firebaseapp.com',
  projectId: 'estacionesmeteo-tfg',
  storageBucket: 'estacionesmeteo-tfg.appspot.com',
  messagingSenderId: '664913976782',
  appId: '1:664913976782:web:cd1e7d56cc2a54f891df9f',
  measurementId: 'G-K1SDK2G0H4'
};

// Initialize Firebase
 app = initializeApp(this.firebaseConfig);
 analytics = getAnalytics(this.app);*/

=======
>>>>>>> a800e1f9fb64b5d7831d026b06582a8fb6deb017
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
}
