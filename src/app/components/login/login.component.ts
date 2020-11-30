import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, 
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/dashboard');
    }
  }

  loginGoogle(){
    this.authenticationService.loginGoogle().then( res => {

      let user = {
        email: res.additionalUserInfo.profile['email'],
        name: res.additionalUserInfo.profile['name'],
        image: res.additionalUserInfo.profile['picture']
      }

      localStorage.setItem('token',JSON.stringify(user));

      window.location.replace('/dashboard')

    }).catch(function(error) {
      // this.showSpinner = false;
      console.log(error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

}
