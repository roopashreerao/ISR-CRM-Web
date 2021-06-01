import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from './model/login-response.model';
import { AuthenticationService } from './services/index'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private isUserLoggedIn: boolean;
  loggedInUser: LoginResponse;
  public isAssociate: boolean;
  public modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(public authenticationService: AuthenticationService, private router: Router, private modalService: BsModalService) {
  }

  ngOnInit() {
    console.log("Initialting app component")
    this.getLoggedInUser();
    this.isUserLoggedIn = this.authenticationService.isLoggedIn();

    if (!this.isUserLoggedIn) {
      console.log(" user not logged in ", this.isUserLoggedIn);
      this.logout();
    }
  }

  logout() {
    console.log("logout.... from app component");
    this.authenticationService.logout();
  }

  getLoggedInUser() {
    this.authenticationService.currentUser.subscribe((user) => {
      console.log('getLoggedInUser subscription in app.component: ', user);
      this.loggedInUser = user != null ? user : new LoginResponse();
    })
  }

}



