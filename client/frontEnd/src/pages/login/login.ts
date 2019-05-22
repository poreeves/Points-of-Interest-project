import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { response } from 'express';

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
    return this._userService.logUser().subscribe( res => {
      console.log('res', res)
      sessionStorage.setItem('token', res['token']);
      sessionStorage.setItem('userId', res['userId']);
      if(res = true){
        this.navCtrl.pop();
        this._userService.loggedIn = true;
        return this._userService.getUserInfo().subscribe((response: any) => {
          console.log(response)
          this._userService.userInfo = response
        })
      }
      console.log("loggedIn", this._userService.loggedIn, this._userService.userInfo)
   }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillLeave(){
  }
  
}
