import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FavoritesPage } from '../favorites/favorites'

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCrtl: MenuController) {
  }
  toFav(){
    return this.navCtrl.push(FavoritesPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewDidEnter(){
    this.enableHomeMenu();
    console.log("did enter")
  }

  enableHomeMenu() {
    this.menuCrtl.enable(true, 'home');
    this.menuCrtl.enable(false, 'points');
  }
}
