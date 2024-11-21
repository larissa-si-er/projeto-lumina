// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cadastro',
//   templateUrl: './cadastro.page.html',
//   styleUrls: ['./cadastro.page.scss'],
// })
// export class CadastroPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

// import { Component } from '@angular/core';
// import {
//   LoadingController,
//   NavController,
//   ToastController,
// } from '@ionic/angular'; // Serviços do Ionic
// import { AuthService } from '../services/auth.service'; // Serviço de autenticação

// @Component({
//   selector: 'app-cadastro',
//   templateUrl: './cadastro.page.html',
//   styleUrls: ['./cadastro.page.scss'],
// })
// export class CadastroPage {
//   name: string = '';
//   email: string = '';
//   password: string = '';

//   constructor(
//     private authService: AuthService, // Serviço de autenticação
//     private loadingCtrl: LoadingController, // Loader para feedback visual
//     private toastCtrl: ToastController, // Toast para mensagens ao usuário
//     private navCtrl: NavController // Controle de navegação
//   ) {}

//   async register() {
//     // Validações básicas
//     if (!this.name || !this.email || !this.password) {
//       this.showToast('Por favor, preencha todos os campos.');
//       return;
//     }

//     // Exibe o loader durante o cadastro
//     const loading = await this.loadingCtrl.create({
//       message: 'Cadastrando...',
//       spinner: 'crescent',
//     });
//     await loading.present();

//     try {
//       // Registra o usuário no Firebase
//       await this.authService.registerWithEmail(this.email, this.password);
//       await loading.dismiss(); // Remove o loader
//       this.showToast('Cadastro realizado com sucesso!', 'success');
//       this.navCtrl.navigateForward('/login'); // Redireciona para login
//     } catch (err) {
//       await loading.dismiss(); // Remove o loader
//       this.showToast('Erro ao cadastrar. Tente novamente.', 'danger');
//     }
//   }

//   async showToast(message: string, color: string = 'dark') {
//     const toast = await this.toastCtrl.create({
//       message,
//       duration: 2000,
//       position: 'top',
//       color,
//     });
//     toast.present();
//   }
// }

// alteraçaoooooooooooo
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss'],
})
export class CadastroPage {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  endereco = {
    zipcode: '',
    road: '',
    state: '',
    city: '',
    neighborhood: '',
  };
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  async register() {
    try {
      this.loading = true;
      // aqui registra usuário no Firebase
      const firebaseUser = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      const userPayload = {
        id: firebaseUser.user?.uid, // UID gerado pelo Firebase
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password, // Armazenar hash no backend
        endereco: this.endereco, // Envia o endereço como um objeto
        role: 'volunteer', // Valor padrão
        totalHours: 0, // Valor padrão
      };

      // aqui envia os dados para o backend
      await firstValueFrom(
        this.http.post('http://localhost:3000/user', userPayload)
      );

      await this.showToast('✔️ Cadastro realizado com sucesso!', 'success');
      this.navCtrl.navigateForward('/login');
    } catch (err) {
      await this.showToast('❌ Erro ao cadastrar. Tente novamente.', 'danger');
    } finally {
      this.loading = false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
