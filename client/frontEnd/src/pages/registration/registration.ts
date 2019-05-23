import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  private reg: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserServiceProvider,
    private formBuilder: FormBuilder) {
      this.reg = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required]
      })
  }

  onRegister(){
    this._userService.user.firstName = this.reg.value['firstName']
    this._userService.user.lastName = this.reg.value['lastName']
    this._userService.user.email = this.reg.value['email']
    this._userService.user.password = this.reg.value['password']
    console.log("register work")
    console.log(this._userService.user)
    console.log(this.reg.value)
    
    return this._userService.postUser().subscribe( res => {
        sessionStorage.setItem('token', res['token']);
        sessionStorage.setItem('userId', res['userId']);
        console.log(res)
      if(res = true){
        this.navCtrl.pop();
        this._userService.loggedIn = true;
      }
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
