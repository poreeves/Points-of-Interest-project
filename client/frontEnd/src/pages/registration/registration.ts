import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { response } from 'express';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserServiceProvider) {
  }

  onRegister(){
    console.log("register work")
    
    return this._userService.postUser().subscribe( res => {
      if(res = true){
        this.navCtrl.pop();
        sessionStorage.setItem('token', res['token']);
        sessionStorage.setItem('userId', res['userId']);
        console.log(res)
      }
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
