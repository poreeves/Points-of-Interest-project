import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  private log: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserServiceProvider,
    private formBuilder: FormBuilder ) {
      this.log =this.formBuilder.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
      })
  }

  onLog(){
    this._userService.user.email = this.log.value['email']
    this._userService.user.password = this.log.value['password']
    return this._userService.logUser().subscribe( res => {
      console.log('res', res)
      sessionStorage.setItem('token', res['token']);
      sessionStorage.setItem('userId', res['userId']);
      if(res = true){
        this.navCtrl.pop();
        this._userService.loggedIn = true;
      }
   }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillLeave(){
    console.log("loggedIn", this._userService.loggedIn)
    return this._userService.getUserInfo().subscribe((response: any) => {
        console.log(response)
        this._userService.userInfo = response
      })
  }
  
}
