import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFireAuth) { }

  loginEmailUser(email: string, pass: string) {
      return new Promise( (resolve, reject) => {
          this.afs.auth.signInWithEmailAndPassword(email, pass).
          then( userData => resolve(userData),
          err => reject(err));
      });
  }

  logout() {
    return this.afs.auth.signOut();
  }

  isAuth() {
    return this.afs.authState.pipe(map(auth => auth));
  }
}
