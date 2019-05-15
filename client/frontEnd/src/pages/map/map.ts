import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
    map: any;
    
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    this.initMap();
    console.log(this.mapElement);
  }
  initMap() {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
}
