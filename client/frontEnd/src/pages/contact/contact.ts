import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
