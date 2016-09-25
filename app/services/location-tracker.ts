import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
 
@Injectable()
export class LocationTracker{
  private positionObserver: any;
  public position: number;
  private watch: any;
  
  constructor() {;
    this.position = Observable.create(observer => {
      this.positionObserver = observer;
    });
 
  }
 
  startTracking() {
    const options = {
        frequency: 3000, 
        enableHighAccuracy: true     
    };
    
     this.watch = Geolocation.watchPosition(options);
    
    this.watch.subscribe((data) => {
      console.log(data.coords);
        this.notifyLocation(data.coords);
    });
    
    // Background Tracking wont work in web browser, only emulator
    
    let backgroundOptions = {
        desiredAccuracy: 10,
        stationaryRadius: 10,
        distanceFilter: 30
    };
    
    // backgroundGeoLocation.configure((location) => {
    //     this.notifyLocation(location);
    // }, (err) => {
    //     console.log(err);
    // }, backgroundOptions);
    
    // backgroundGeoLocation.start();
    
    return this.position;
    

  }
 
  stopTracking() {
    // backgroundGeoLocation.finish();
    this.watch.unsubscribe();
  }
 
  notifyLocation(location) {
    this.positionObserver.next(location);
  }
 
}