import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserServiceProvider ) {
  }

  onLog(){
    return this._userService.logUser().subscribe((response: any) => 
    console.log(response))
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
