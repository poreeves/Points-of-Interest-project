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
    positionMarker: []=[]
    placeId: []=[]
    results: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCrtl: MenuController,
    public _maps: MapsProvider) {
  }
  setMarkers(pos){
    let marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
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
        zoom: 15
      }); 
      let marker = new google.maps.Marker({
        position: this._maps.currentPos,
        map: this.map
      });

      let request = {
        location: this._maps.currentPos,
        radius: '500',
        type: ['point_of_interest']
      };
    
      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, (results, status)=>{
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let place = results[i];
            console.log(results[i].place_id)
            let placeId = {
              id: results[i].place_id
            }
            let positionMarker = {
              lat: place.geometry.viewport.na.j,
              lng: place.geometry.viewport.ia.j
            }
            this.positionMarker.push(positionMarker)
            this.placeId.push(placeId)
          }
          for(let i = 0; i < this.positionMarker.length; i++) {
            let marker = new google.maps.Marker({
              position: this.positionMarker[i],
              map: this.map
          })
          console.log(this.positionMarker[i]);  
        }
          console.log(this.placeId);  
          // this.setMarkers(this.positionMarkers)
        }
       })
      
  }
     callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          let positionMarker = {
            lat: place.geometry.viewport.na.j,
            lng: place.geometry.viewport.ia.j
          }
          console.log(positionMarker);
        }
          // this.setMarkers(this.positionMarkers)
      }
     }
}
