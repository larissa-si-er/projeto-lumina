// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private afAuth: AngularFireAuth) {}

//   async loginWithEmail(email: string, password: string) {
//     return this.afAuth.signInWithEmailAndPassword(email, password);
//   }

//   async registerWithEmail(email: string, password: string) {
//     return this.afAuth.createUserWithEmailAndPassword(email, password);
//   }

//   logout() {
//     return this.afAuth.signOut();
//   }

//   getUser() {
//     return this.afAuth.authState;
//   }
// }
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Importação do Firebase compat

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método para registrar o usuário com email e senha
  async registerWithEmail(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!userCredential.user) {
      throw new Error('Erro ao criar usuário no Firebase.');
    }

    return userCredential;
  }

  // Método para login com email e senha
  async loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para logout
  async logout() {
    return this.afAuth.signOut();
  }

  // Método para observar o estado de autenticação
  getUser() {
    return this.afAuth.authState;
  }
}
