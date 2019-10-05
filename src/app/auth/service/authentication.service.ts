import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, map } from 'rxjs/operators';
// import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post(`http://localhost:5003/api/login`, { email, password })
            .pipe(map((user :any) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }
    loginnew(username: string, password: string) {
        const head = this.renderOptions();
        return this.http.get(`http://localhost:5003/api/signup`, head ).pipe(timeout(10000));
    }
    renderOptions() {
      //  let options = {};
       // const head = new HttpHeaders();
        //options = head.append({ 'Content-Type': 'application/json' });
        // let head = new Headers({
        //     'Content-Type': 'application/json'
        // });
        const head = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return {
            headers: head
        };
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
