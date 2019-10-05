import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-no-data',
  template: `
    <div class="alert no-data alert-danger">
    No Data Found
  </div>
    `
})

export class NoDataComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
