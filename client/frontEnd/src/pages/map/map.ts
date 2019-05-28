import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
    // map: any;
    // positionMarker: any[] = [];
    // placeId: any[]=[]
    results: any;
    // placeDetails: any[]=[]
  @Output() map = new EventEmitter

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
        map: this.map,
        label: 'U'
      });
      
      let request = {
        location: this._maps.currentPos,
        // radius: '1500',
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: ['pizza'],
        type: ['food']
      };
    
      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, (results, status)=>{
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let place = results[i];
            console.log(results[0])
            console.log('results.geometry loc lat ', results[0].geometry.location.lat)
            let placeId = {
              id: results[i].place_id,
              lat: place.geometry.viewport.na.j,
              lng: place.geometry.viewport.ia.j,
              name: place.name,
              rating: place.rating,
              icon: place.icon,
              location: results[i].geometry.location
            }
            // let positionMarker = {
            //   lat: place.geometry.viewport.na.j, place.geometry.location.lat
            //   lng: place.geometry.viewport.ia.j  place.geometry.location.lng
            // }
            // this.positionMarker.push(positionMarker)
            this._maps.placeId.push(placeId)
            console.log(this._maps.placeId)
          }
          for(let i = 0; i < this._maps.placeId.length; i++) {
            let infowindow = new google.maps.InfoWindow({
              content: this._maps.placeId[i].name
            });
            let marker = new google.maps.Marker({
              position: this._maps.placeId[i].location, 
              // {
              // lat: this._maps.placeId[i].lat,
              //   lng: this._maps.placeId[i].lng,
              // },
              map: this.map
          }) 
          marker.addListener('click', () => {
            infowindow.open(this.map, marker);
          });
          console.log(marker)
        }
        }
       })
      
  }
}
