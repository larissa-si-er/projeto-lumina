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
import { Component } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async register() {
    if (!this.name) {
      this.showToast('Por favor, insira seu nome.', 'danger');
      return;
    }

    if (!this.isEmailValid(this.email)) {
      this.showToast(
        'Email inválido. Por favor, verifique o formato.',
        'warning'
      );
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.showToast('A senha deve ter pelo menos 6 caracteres.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.authService.registerWithEmail(this.email, this.password);
      await loading.dismiss();
      this.showToast('✔️ Cadastro realizado com sucesso!', 'success');
      this.navCtrl.navigateForward('/login');
    } catch (err) {
      await loading.dismiss();
      this.showToast('❌ Erro ao cadastrar. Tente novamente.', 'danger');
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    toast.present();
  }
}
