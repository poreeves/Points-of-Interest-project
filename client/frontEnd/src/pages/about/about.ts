import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public menuCrtl: MenuController) {

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
