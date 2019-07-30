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


  private ingredientes: Observable<any[]>;

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

  getRecetaId( id: string ) {
      return this.af.doc('recetas/' + id ).valueChanges();
  }

  getIngredientesReceta( id: string ) {
    return this.ingredientes =  this.af.collection<Materia>('recetas/' + id + '/ingredientes' ).snapshotChanges()
    .pipe(map(changes => {
       return changes.map(action=>{
            const data = action.payload.doc.data();
            data.id = action.payload.doc.id;
            return data;
       });
    }));
  }

  getMaterial() {
      return this.af.collection<Materia>('materia').snapshotChanges().pipe(map(changes => {
        return changes.map(action=>{
             const data = action.payload.doc.data();
             data.id = action.payload.doc.id;
             return data;
        });
     }));
  }

  getMaterialReceta() {
   this.af.collection<Materia>('materia').valueChanges();
}

  addMaterial(materia: Materia) {
      return this.af.collection<Materia>('materia').add(materia);
  }

  addIngrediente(id: string, materia: Materia){
    return this.af.collection<Materia>('recetas/'+id+'/ingredientes').add(materia);
  }

  addReceta(materia: Materia) {
    return this.af.collection<Materia>('recetas').add(materia);
  }

  getRecetas() {
    return this.af.collection<Materia>('recetas').snapshotChanges();
  }

  deleteMaterial(id: string) {
      return this.af.doc('materia/' + id).delete();
  }

  deleteReceta(id: string){
    return this.af.doc('recetas/' + id).delete();
  }
}
