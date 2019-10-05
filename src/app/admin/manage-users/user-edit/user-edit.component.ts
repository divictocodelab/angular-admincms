import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { errorMessage, notificationMessage } from 'src/app/shared/constant/default.constant';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { LayoutService } from 'src/app/shared/components/layout/service/layout.service';

export interface editUserFormFields {
  name: string;
  phone_number: string;
  email: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})

export class UserEditComponent implements OnInit {

  editUserForm: FormGroup;
  errorMsg = errorMessage;
  notificationMsg = notificationMessage;
  initData: editUserFormFields = {
    name: '   ',
    phone_number: ' ',
    email: '',
  };

  userId: any;
  loading: boolean;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    public toasterService: ToasterService,
    private router: Router,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.createForm();
    this.activateRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.userId = params['id'];
        this.userService.getUserDetail(this.userId)
          .subscribe(
            (data: any) => {
              this.intializeFormData(data.user);
            },
            error => {

            });
      }
    });
  }

  intializeFormData(data: any) {
    if (data) {
      for (const key in data) {
        if (this.initData.hasOwnProperty(key)) {
          this.initData[key] = data[key];
        }
      }
    }

    const allControls = this.editUserForm.controls;
    for (const controlKey in allControls) {
      if (allControls.hasOwnProperty(controlKey) && this.initData.hasOwnProperty(controlKey)) {
        allControls[controlKey].setValue(this.initData[controlKey])
      }
    }
    this.editUserForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      this.userService.updateUserDetail(this.editUserForm.value, this.userId)
        .subscribe(
          (data: any) => {
            if (data.success) {
              this.layoutService.userDetail.next({username: this.editUserForm.value.name});
              this.layoutService.userDetailSubject.next({userDetailSubject: this.editUserForm.value.phone_number});
          
          
          
          
              this.toasterService.Success(this.notificationMsg.UPDATED_SUCCESS('User'));
              this.router.navigate(["admin/users"]);
              this.loading = false;
            }
          },
          error => {

          });
    } else {
      this.editUserForm.markAsTouched({ onlySelf: true });
      Object.keys(this.editUserForm.controls).forEach(field => { // {1}
        const control = this.editUserForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      name: [this.initData.name, Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]*$/), Validators.maxLength(100)])],
      phone_number: [this.initData.phone_number, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(12)])],
      email: [this.initData.email,
      Validators.compose([
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.maxLength(100)
      ])]
    });
  }

  get name() {
    return this.editUserForm.get('name');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get phone_number() {
    return this.editUserForm.get('phone_number');
  }

}
