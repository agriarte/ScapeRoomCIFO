import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; //EN VEZ DE IMPORTAR MODULO {AUTH} QUE DA ERROR
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { User } from '../shared/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastCtrl: ToastController
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log('hay sesion');
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error :', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.default.auth.GoogleAuthProvider() //accede a {AUTH} desde firebase.default
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error :', error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log('Error :', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error :', error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error :', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      const toast = await this.toastCtrl.create({
        message: 'BYE BYE',
        position: 'middle',
        color: 'warning',
        duration: 2000,
      });
      toast.present();
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  async errorLoggedOff() {
    const toast = await this.toastCtrl.create({
      message: 'PLEASE LOG IN',
      position: 'middle',
      color: 'warning',
      duration: 2000,
    });
    toast.present();
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
