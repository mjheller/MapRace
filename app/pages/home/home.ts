import {Component} from '@angular/core';
import {NavController, Page} from 'ionic-angular';
import {LocationTracker} from '../../services/location-tracker';
 
@Page({
  templateUrl: 'build/pages/home/home.html'
})

@Component({
  templateUrl: 'build/pages/home/home.html'
   //providers: [LocationTracker]
})
export class HomePage {
  public currentLocation: string;
  static get parameters(){
    return [[LocationTracker]];
  }

  constructor(public tracker: any, public navCtrl: NavController) {
    this.tracker = tracker;
  }
  
  start() {
    this.tracker.startTracking().subscribe((position) => {
        this.currentLocation = position.latitude + ", " + position.longitude ;
    });
  }
  
  stop() {
    this.tracker.stopTracking();
  }
  
}
