import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { notificationMessage, errorMessage } from "../../../shared/constant/default.constant";
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
// export interface AddUserFormFields {
//   name: string;
//   phone_number: string;
//   address: string;
//   city: string;
//   state: string;
//   description: string;
// }

export interface AddUserFormFields {
  name: string;
  phone_number: string;
  email: string;
  profileImage: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html'
})

export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  errorMsg = errorMessage;
  maxFileSize = 2;

  notificationMsg = notificationMessage;
  profileImageErrors: Array<string>;
  initData: AddUserFormFields = {
    name: '',
    phone_number: '',
    email: '',
    profileImage: '',
  };
  loading: boolean;
  fileExt = "JPG, GIF, PNG, JPEG";
  @ViewChild("profileDisplay", { static: false, }) profileDisplay: ElementRef;
  selectedFile: any;
  profile_image: any;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    public toasterService: ToasterService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const formdata: FormData = new FormData();
      
      if (this.selectedFile) {
        formdata.append("profile_image", this.selectedFile);
      }
      formdata.append("name", this.addUserForm.value.name);
      formdata.append("phone_number", this.addUserForm.value.phone_number);
      formdata.append("email", this.addUserForm.value.email);

      this.userService.addUser(formdata)
        .subscribe(
          (data: any) => {
            if (data.success) {
              this.toasterService.Success(this.notificationMsg.CREATE_SUCCESS('User'));
              this.router.navigate(["admin/users"]);
              this.loading = false;
            }
          },
          error => {
              
          });
    } else {
      this.loading = false;
      this.addUserForm.markAsTouched({ onlySelf: true });
      Object.keys(this.addUserForm.controls).forEach(field => {
        const control = this.addUserForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      name: [this.initData.name, Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]*$/), Validators.maxLength(100)])],
      phone_number: [this.initData.phone_number, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(12)])],
      email: [this.initData.email,
      Validators.compose([
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/), Validators.maxLength(100)
      ])]
    });
  }

  handleImage(event) {
    const file = event.target.files[0];
    this.profileImageErrors = [];
    this.selectedFile = file;
    const checkError = this.imageValidators(file, this.profileImageErrors);
    if (file && checkError) {
      // this.profileImage = file;
      this.displaySelectedImage(file, this.profileDisplay);
      this.profile_image = this.selectedFile.name;

      const profileimageformdata: FormData = new FormData();
      if (this.selectedFile) {
       profileimageformdata.append("profile_image", this.selectedFile);
      }
    } else {
      this.toasterService.Error(this.profileImageErrors[0]);

      //   this.profileImage.setValue(null);
    }
  }

  imageValidators(file, errorObj) {
    const extensions = this.fileExt.split(",").map(function(x) {
      return x.toLocaleUpperCase().trim();
    });

    const ext =
      file.name
        .toUpperCase()
        .split(".")
        .pop() || file.name;
    const exists = extensions.includes(ext);
    if (!exists) {
      errorObj.push("Please upload image file type " + this.fileExt);
      this.toasterService.Error("Please upload image file type " + this.fileExt);
      return null;
    }

    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100;
    if (size > this.maxFileSize) {
      const err = "" + file.name + " exceeds file size limit of " + this.maxFileSize + " MB";
      errorObj.push(err);
      this.toasterService.Error(err);
      return null;
    }
    return file;
  }

  displaySelectedImage(file, element: ElementRef) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imgElement: HTMLImageElement = element.nativeElement;
      imgElement.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  get name() {
    return this.addUserForm.get('name');
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get phone_number() {
    return this.addUserForm.get('phone_number');
  }

}
