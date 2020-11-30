import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    private fire:AngularFireAuth, 
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
    ) { 
  }

  loginGoogle(){
    return this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    return this.fire.auth.signOut();
  }
}
