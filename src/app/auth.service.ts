import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // do the following OR add this to tsconfig.json -> "strictPropertyInitialization": false
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private router: Router) { 
    // afAuth.authState.subscribe(theUser => this.user = theUser); // before using as observable
    // need to unsubscribe using ngDestroy if we use this approach

    this.user$ = this.afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      localStorage.setItem('returnUrl', returnUrl);      
    }

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


  logout(){
    this.afAuth.signOut();
  }
}
