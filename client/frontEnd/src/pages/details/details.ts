import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _maps: MapsProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  ionViewDidEnter(){
    console.log("did enter")
    console.log('geometyry location', this._maps.placeDetails['geometry']['location'])
    
  }

}
