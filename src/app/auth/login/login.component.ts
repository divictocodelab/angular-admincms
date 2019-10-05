import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { errorMessage } from 'src/app/shared/constant/default.constant';
import { TokenManager } from 'src/app/shared/services/token-manager.service';

export interface AddUserFormFields {
  email: string;
  password: string;

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthenticationService]
})

export class LoginComponent {
  initData: AddUserFormFields = {
    password: '',
    email: '',
  };
  errorMsg = errorMessage;
  public loginForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenManager: TokenManager
  ) {
    // if (this.tokenManager.fetchToken() != '') {
    //   this.router.navigate(["/admin"]);
    // }
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required,])],
      'password': ['', Validators.compose([Validators.required,])]
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (data: any) => {
          this.router.navigate(['admin']);
        },
        error => {

        });
    }else{
      this.loginForm.markAsTouched({ onlySelf: true });
      Object.keys(this.loginForm.controls).forEach(field => { 
        const control = this.loginForm.get(field);           
        control.markAsTouched({ onlySelf: true });       
      });
    }
   

  }

  email() {
    return this.loginForm.get('email');
  }
  password() {
    return this.loginForm.get('password');
  }

}
