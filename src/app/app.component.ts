import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';
import { TokenManager } from './shared/services/token-manager.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'admincms';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenManager: TokenManager
  ) { }

  ngOnInit() {
    //  console.log(this.activatedRoute.url.value[0].path);
    // this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
    //   console.log(url);
    //   return console.log(url[0].path);
    // })

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        if (event.url === '/login') {
          if (this.tokenManager.fetchToken() != '') {
            const user = this.tokenManager.user();
            if (user != '' && user.user_type.toUpperCase() === 'ADMIN') {
              this.router.navigate(["/admin"]);
            }
          }
        }
      });
    // this.router.events.subscribe((url: any) => {
    //   console.log(this.router.url);
    //   if (this.router.url === '/login') {
    //     if (this.tokenManager.fetchToken() != '') {
    //       const user = this.tokenManager.user();
    //       console.log(user);
    //       // if (user != '' && user.user_type.toUpperCase() === 'ADMIN') {
    //       //   this.router.navigate(["/admin"]);
    //       // }
    //     }
    //   }
    // });
  }
}
