import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Materia } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private afs: AngularFireAuth, private af: AngularFirestore) { }

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

  updateMaterial(id: string, data: any) {
    return this.af.doc('materia/' + id ).update(data);
  }

  getMaterialId( id: string) {
      return this.af.doc('materia/' + id ).valueChanges();
  }

  getMaterial() {
      return this.af.collection<Materia>('materia').snapshotChanges();
  }

  addMaterial(materia: Materia) {
      return this.af.collection<Materia>('materia').add(materia);
  }

  deleteMaterial(id: string) {
      return this.af.doc('materia/' + id).delete();
  }
}
