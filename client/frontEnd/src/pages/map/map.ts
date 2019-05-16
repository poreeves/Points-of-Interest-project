import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let google
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
    map: any;
    
    
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCrtl: MenuController,
    public _maps: MapsProvider) {
  }
  
  ionViewDidLoad() {
    this.initMap();
    console.log("did load");
  }
  ionViewDidEnter(){
    this.enablePointsMenu();
    console.log("did enter")
  }

  enablePointsMenu() {
    this.menuCrtl.enable(true, 'points');
    this.menuCrtl.enable(false, 'home');
  }
  initMap() {
      let that = this
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: this._maps.currentPos,
        zoom: 8
      }); 
      let marker = new google.maps.Marker({
        position: this._maps.currentPos,
        map: this.map
      })
    }
}
