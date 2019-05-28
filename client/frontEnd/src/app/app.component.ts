import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import {DetailsPage} from '../pages/details/details'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account'

import { MapsProvider } from '../providers/maps/maps';

declare let google
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  map: any
  results: any
  details: any

  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _maps: MapsProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  // onClick(page){
  //   this.nav.push(page)
  // } 
  // getting errors

  
  onContact(){
    this.nav.push(ContactPage)
  }
  onSettings(){
    this.nav.push(ContactPage)
  }
  onAbout(){
    this.nav.push(AboutPage)
  }
  onHelp(){
    this.nav.push(AboutPage)
  }
  sliceUrl(str){
    let halfStr = str.replace('<a href="', '"')
    let strNum: number = halfStr.search('>')
    console.log(strNum)
    let newStr = halfStr.slice(0, strNum)
    console.log("new string", newStr)
    this._maps.imgUrl = newStr
    
  }
  onDetails(){
    this.nav.push(DetailsPage);
  }
  // goToDetails(id){
  //   this.nav.push(DetailsPage);
  //   console.log(id)
  //   let request = {
  //     placeId: id,
  //     fields: ['name', 'place_id', 'type', 'rating', 'formatted_phone_number', 'geometry', 'formatted_address', 'icon', 'photo', 'opening_hours', 'website']
  //   };
  //   let service = new google.maps.places.PlacesService(document.createElement('div'));
  //     service.getDetails(request, (results, status) => {
  //         if (status == google.maps.places.PlacesServiceStatus.OK) {
  //           this._maps.placeDetails = results
  //           console.log('results hours', results['opening_hours']['weekday_text'])
  //           this._maps.openHours = results['opening_hours']['weekday_text']
  //           console.log( 'provider details' ,this._maps.placeDetails)
  //           console.log('placedetails[place_id]', this._maps.placeDetails['place_id'])
  //           // this.sliceUrl(this._maps.placeDetails['photos'][0]['html_attributions'][0])
  //         }
  //       })

  // }
}
