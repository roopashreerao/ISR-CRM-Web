import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../model/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router, private toaster: ToastrService, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue()) {
      this.router.navigate(['homepage']);
    }
  }

  public userRequest: LoginRequest = { username: '', password: '', grant_type: 'password' };
  public isSubmitted: boolean;
  public error: string;


  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    this.error = '';
    if (form.invalid)
      return;
    this.authenticationService.login(this.userRequest)
      .subscribe(
        data => {
          if (data && data.access_token) {
            this.toaster.success("Login", "Logged in successfully");
            console.log("Navigate to homepage");
            this.router.navigate(['homepage']);
          }
        },
        error => {
          console.log("error")
          this.toaster.error('Unable to login please try again', 'Error', {
            timeOut: 3000
          });
        });
  }

}


