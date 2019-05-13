import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  postUrl: string = "http://localhost:3000/api/appUsers"
  logUrl: string = "http://localhost:3000/api/appUsers/login"
  user = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": ""
  }

  constructor(public _http: HttpClient) { }

    postUser(){
      console.log("post ran")
      return this._http.post(this.postUrl, this.user)
    }
    // return this._http.post(this.postUrl, {
    //   "firstName": "user3",
    //   "lastName": "user3",
    //   "email": "user3@user.com",
    //   "password": "user3"
    // })
    // }

    logUser(){
      return this._http.post(this.logUrl, this.user)
    }
      
    
    
  

}
