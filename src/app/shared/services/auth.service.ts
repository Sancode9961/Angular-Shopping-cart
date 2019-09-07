import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  
  user$: Observable<firebase.User>;

  constructor(private userService:UserService, private afAuth:AngularFireAuth,private route:ActivatedRoute) {
    this.user$=afAuth.authState;
   }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());//then is not working here to get return url back after login>>another approach>>app.component.ts
  }
  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
      .switchMap(user => {
        if(user) return this.userService.get(user.uid);
        
        return Observable.of(null);
      })//this causes infinite loop when we use async pipe in html.ie:async pipe with nested observable causes infinite loop of rendering ui
  }
}