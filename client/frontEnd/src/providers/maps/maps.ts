import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, Nav } from 'ionic-angular';
import { response } from 'express';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare let google
@Injectable()
export class MapsProvider {
  @ViewChild(Nav) navCrtl: NavController;
  currentPos: {};
  placeId: any[] = [];
  placeDetails: any[] = [];
  map: any;
  imgUrl: string;
  openHours: any[] = [];
  favPlaces: any[] = [];
  favDetails: any[] = [];
  postUrl: string = "http://localhost:3000/api/appUsers/";
  isFav: boolean = false;
  isFavId: string = '';
  
  

  constructor(public _http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello MapsProvider Provider');
  }
  checkFav(placeId){
    return this._http.get(this.postUrl + sessionStorage.getItem('userId') + '/favPlaces?filter=%7B%22where%22%3A%7B%22placeId%22%3A%22' + placeId + '%22%7D%7D&access_token=' + sessionStorage.getItem('token'))
  }
  onCheckFav(placeId){
    return this.checkFav(placeId).subscribe((response: any) => {
      console.log("onCheckFav res", response)
      if(response.length !== 0){
        this.isFav = true
        this.isFavId = response[0]['id']
      }else {
        this.isFav = false
      } console.log('isFav', this.isFav)
        console.log('isfavId' , this.isFavId)
    })
  }
  
  deleteFav(){
    return this._http.delete(this.postUrl + sessionStorage.getItem('userId') + '/favPlaces/' + this.isFavId + '?access_token=' + sessionStorage.getItem('token'))
  }

  onDeleteFav(){
    return this.deleteFav().subscribe((response: any) => {
      console.log('onDeleteFav', response)
    })
  }

  sliceUrl(str){
    let halfStr = str.replace('<a href="', '"')
    let strNum: number = halfStr.search('>')
    console.log(strNum)
    let newStr = halfStr.slice(0, strNum)
    console.log("new string", newStr)
    this.imgUrl = newStr
    
  }
  goToDetails(id, fk){
    console.log(id)
    let request = {
      placeId: id,
      fields: ['name', 'place_id', 'type', 'rating', 'formatted_phone_number', 'geometry', 'formatted_address', 'icon', 'photo', 'opening_hours', 'website']
    };
    let service = new google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          this.placeDetails = results
          console.log('results hours', results['opening_hours']['weekday_text'])
          this.openHours = results['opening_hours']['weekday_text']
          console.log( 'provider details' ,this.placeDetails)
          console.log('placedetails[place_id]', this.placeDetails['place_id'])
          // this.sliceUrl(this._maps.placeDetails['photos'][0]['html_attributions'][0])
        }
      })
  }

  addFav(id, name){
      let token = sessionStorage.getItem('token');
      let userId = sessionStorage.getItem('userId');
      console.log(userId)
      console.log(id), name
      return this._http.post(this.postUrl + userId + '/favPlaces?access_token=' + sessionStorage.getItem('token'), {
        "placeId": id,
        "name": name,
        "userId": userId
      })
  }

  getFavs(){
    let userId = sessionStorage.getItem('userId');
    return this._http.get(this.postUrl + userId + '/favPlaces?access_token=' + sessionStorage.getItem('token'))
  }

  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('lat', resp.coords.latitude)
      console.log('lng', resp.coords.longitude)
      this.currentPos= {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }


     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
}
