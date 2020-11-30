import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-estadio';
  token = false;
  constructor(
    private afAuth: AngularFireAuth
  ) { }
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.token = true;
    }
  }

  logout(){
    this.afAuth.auth.signOut();
    localStorage.clear();
    window.location.replace('/');
  }

}
