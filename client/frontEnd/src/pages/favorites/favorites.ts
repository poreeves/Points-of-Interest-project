import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { DetailsPage } from '../details/details'

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public _maps: MapsProvider) {
  }
  onDetails(){
    return this.navCtrl.push(DetailsPage)
  }
  onGetFav(){
    return this._maps.getFavs().subscribe((res: any) => {
      let favId: any[] = []
      console.log(res)
      console.log('res.place', res['placeId'])
        for(let i=0; i<res.length; i++){
          favId.push({
            placeId: res[i]['placeId'],
            name: res[i]['name']
          })
        }
        this._maps.favPlaces = favId

    })
  }
  ionViewDidLoad() {
    this.onGetFav()
    
  }
  ionViewDidEnter(){
    console.log('did enter map favplace', this._maps.favPlaces)
  }
}
