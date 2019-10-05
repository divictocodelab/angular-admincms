import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ManageListBase } from 'src/app/shared/baseClass/list-base.class';
import { API } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/shared/services/toaster.service';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent extends ManageListBase implements OnInit {
  p: number = 1;
  userList = [];
  queryObj: {};
  newStatus: string;
  popupBodyMessage: string;
  id: any;
  loading: false;

  constructor(
    public fb: FormBuilder,
    public manageUserService: UserService,
    public toasterService: ToasterService
  ) {
    super(API.UserEndpoints.GetUserList, manageUserService, toasterService);
  }

  ngOnInit() {
    this.dataList = [];
    super.ngOnInit();
  }

  onDelete(id) {
    this.newStatus = "delete";
    this.popupBodyMessage = "delete";
    this.id = id;
    $("#myModal").modal("show");
  }

  updateStatusById(eventData: any) {
    if (eventData) {
      if (this.newStatus === "delete") {
        super.deleteEntity(API.UserEndpoints.DeleteUser(this.id), this.id);
        $("#myModal").modal("hide");
      }
    } else {
      $("#myModal").modal("hide");
    }
  }

  getData(page) {
    if (!this.loading && this.dataList.length < this.totalQueryableData) {
      this.dataList = [];
      this.queryObj = {
       
        offset: (page - 1) * 10,
      }
      this.getList(page, this.queryObj);
    }
  }
  

}
