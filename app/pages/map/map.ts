import {Component} from '@angular/core';
import {NavController, Page} from 'ionic-angular';
import {LocationTracker} from '../../services/location-tracker';
import {config} from '../../config';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
 
@Component({
  templateUrl: 'build/pages/map/map.html',
  providers: [config]
})

export class MapNavigation {
    public map: any;
    private config: any;
    
    constructor(config: config){
        this.config = config;
        this.initializeMap();
    }
    
    initializeMap() {
        mapboxgl.accessToken = this.config.getMapboxToken();
        //https://www.mapbox.com/mapbox-gl-js/api/ 
        var map = new Map({
            container: '#map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });

    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();   
    }   
}