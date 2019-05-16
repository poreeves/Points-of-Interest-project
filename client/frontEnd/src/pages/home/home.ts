import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegistrationPage } from "../registration/registration"
import { MapsProvider } from '../../providers/maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCrtl: MenuController, public _maps: MapsProvider) {}

  toLog(){
    return this.navCtrl.push(LoginPage)
  }
  toReg(){
    return this.navCtrl.push(RegistrationPage)
  }
  ionViewDidLoad() {
    return this._maps.getCurrentLoc();
    console.log("did load")
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
