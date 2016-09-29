import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LocationTracker} from './services/location-tracker';
import {config} from './config';
import {LoginPage} from './pages/login/login';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
   providers: [LocationTracker, config]
})
export class MyApp {
  
  private rootPage: any;
  
  constructor(private platform: Platform, private config: config) {
    this.rootPage = LoginPage;
    config = this.config.getFirebaseSecret();
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    })
  }
}

ionicBootstrap(MyApp);
