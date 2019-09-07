import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    // this.auth.user$
    // .map(user=>{
    //   return this.userService.get(user.uid);
    // })
    // .subscribe(x=>x.subscribe(...))   or

    return this.auth.user$
      .switchMap(user => {return this.userService.get(user.uid);})
      .map(appUser => appUser.isAdmin)
  }

  //or
  // return this.auth.appUser$
  //     .map(appUser => appUser.isAdmin)
  // }
}
