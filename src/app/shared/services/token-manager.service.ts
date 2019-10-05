import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
@Injectable()

export class TokenManager {
  constructor() { }

  fetchToken() {
    const userData = localStorage.getItem("currentUser");
    let token = "";
    if (userData) {
      token = JSON.parse(userData).token;
    }
    return token;
  }

  user() {
    try {
      const userData = this.fetchToken();
      if (userData) {
        return jwt_decode(userData).user;
      }else{
        return null;
      }
    }
    catch (Error) {
      return null;
    }
  }

  deleteToken() {
    localStorage.removeItem("currentUser");
  }

  fetchData() {
    const userData = localStorage.getItem("currentUser");
    let name: any;
    if (userData) {
      name = JSON.parse(userData).name;
      // data['photo'] = JSON.parse(userData).photo;
    }
    return name;
  }
}
