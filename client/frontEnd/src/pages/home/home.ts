import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegistrationPage } from "../registration/registration"
import { MapsProvider } from '../../providers/maps/maps';
import { UserServiceProvider } from '../../providers/user-service/user-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loggedIn: boolean = true

  constructor(public navCtrl: NavController, public menuCrtl: MenuController, public _maps: MapsProvider,
    public _userService: UserServiceProvider) {}

  toLog(){
    return this.navCtrl.push(LoginPage)
  }
  toReg(){
    return this.navCtrl.push(RegistrationPage)
  }

  toLogOut(){
    return this._userService.logOutUser().subscribe(res => {
      console.log(res)
      if(res = true){
        sessionStorage.clear();
        this._userService.loggedIn = false
      }
    })
  }
  ionViewDidLoad() {
    return this._maps.getCurrentLoc();
  }
  ionViewDidEnter(){
    this.enableHomeMenu();
    console.log(sessionStorage.getItem('token'))
    console.log(this._userService.loggedIn)
    console.log("did enter")
  }

  enableHomeMenu() {
    this.menuCrtl.enable(true, 'home');
    this.menuCrtl.enable(false, 'points');
  }
}
