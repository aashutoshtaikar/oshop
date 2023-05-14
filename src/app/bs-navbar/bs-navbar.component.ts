import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {

  // do the following OR add this to tsconfig.json -> "strictPropertyInitialization": false
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) { 
    // afAuth.authState.subscribe(theUser => this.user = theUser); // before using as observable
    // need to unsubscribe using ngDestroy if we use this approach

    this.user$ = afAuth.authState;
  }

  logout(){
    this.afAuth.signOut();
  }

}
