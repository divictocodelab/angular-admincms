import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../service/layout.service';
declare var $: any;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})

export class NavigationBarComponent implements OnInit {
  username = 'Demo User';
  userDetailSubject = '--';

  constructor(
    private router: Router,
    private layoutService: LayoutService
  ) {
    
    this.layoutService.userDetail.subscribe({
      next: (data : any) => {
        console.log("data");
        console.log(data);
        if (data.username) {
          this.username= data.username;
        }
      },
      error: err => console.log(err)
    });


    this.layoutService.userDetailSubject.subscribe({
      next: (data : any) => {
        console.log("data");
        console.log(data);
        if (data.userDetailSubject) {
          this.userDetailSubject= data.userDetailSubject;
        }
      },
      error: err => console.log(err)
    });
  }

  ngOnInit() {

  }

  login() {
    console.log("clicked");
    $('#myModal').modal('show');
  }


  onLogout() {
    console.log("logout");
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }

}
