import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) { }

  login(){
    /**
     * old way using the firebase compat
     * https://www.youtube.com/watch?v=A-wSkZVxKzU&list=RDCMUClIFqsmxnwVNNlsvjH1D1Aw&start_radio=1&rv=A-wSkZVxKzU&t=551
     * https://firebase.google.com/docs/web/modular-upgrade
     */
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    // OR

    /**
     * new way
     * https://www.positronx.io/angular-firebase-login-with-google-tutorial/
     */
    // this.googleAuth();
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
