import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()

export class LayoutService {
userDetail: BehaviorSubject<object>;
userDetailSubject: Subject<object>;
   
 constructor() {
    this.userDetail = new BehaviorSubject({username: ''});
    this.userDetailSubject = new Subject();
  }
}
