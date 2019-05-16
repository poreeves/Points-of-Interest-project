import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {
  currentPos: {} 

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello MapsProvider Provider');
  }
  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.currentPos= {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }


     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
