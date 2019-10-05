import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { errorMessage } from 'src/app/shared/constant/default.constant';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

export interface AddUserFormFields {
  name: string;
  phone_number: string;
  email: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})

export class UserDetailComponent implements OnInit {

  addUserForm: FormGroup;
  errorMsg = errorMessage;

  initData: AddUserFormFields = {
    name: '   ',
    phone_number: ' ',
    email: '',
  };
  userId: any;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.activateRoute.params.subscribe((params: Params) => {
     console.log(params);
      if (params['id']) {
        console.log(params);
        this.userId = params['id'];
        this.userService.getUserDetail(this.userId)
          .subscribe(
            (data: any) => {

            },
            error => {

            });
      }
    });
  }

  intializeFormData() {

  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.userService.updateUserDetail(this.addUserForm.value, 2)
        .subscribe(
          (data: any) => {

          },
          error => {

          });
    } else {
      this.addUserForm.markAsTouched({ onlySelf: true });
      Object.keys(this.addUserForm.controls).forEach(field => { // {1}
        const control = this.addUserForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      name: [this.initData.name, Validators.compose([Validators.required])],
      phone_number: [this.initData.phone_number, Validators.compose([Validators.required])],
      email: [this.initData.email, Validators.compose([Validators.required])],
    });
  }

  name() {
    return this.addUserForm.get('name');
  }

  email() {
    return this.addUserForm.get('email');
  }

  phone_number() {
    return this.addUserForm.get('phone_number');
  }

}
