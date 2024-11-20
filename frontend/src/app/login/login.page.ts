// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
// import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService) {}

//   async login() {
//     try {
//       await this.authService.loginWithEmail(this.email, this.password);
//       console.log('Login bem-sucedido!');
//     } catch (err) {
//       console.error('Erro ao logar:', err);
//     }
//   }

//   async register() {
//     try {
//       await this.authService.registerWithEmail(this.email, this.password);
//       console.log('Registro bem-sucedido!');
//     } catch (err) {
//       console.error('OPA! Erro ao registrar:', err);
//     }
//   }
// }
// import { Component } from '@angular/core';
// import {
//   LoadingController,
//   NavController,
//   ToastController,
// } from '@ionic/angular';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   email: string = '';
//   password: string = '';

//   constructor(
//     private authService: AuthService,
//     private loadingCtrl: LoadingController,
//     private toastCtrl: ToastController,
//     private navCtrl: NavController
//   ) {}

//   async login() {
//     if (!this.email || !this.password) {
//       this.showToast('Por favor, preencha todos os campos.');
//       return;
//     }

//     const loading = await this.loadingCtrl.create({
//       message: 'Entrando...',
//       spinner: 'crescent',
//     });
//     await loading.present();

//     try {
//       await this.authService.loginWithEmail(this.email, this.password);
//       await loading.dismiss();
//       this.showToast('Login bem-sucedido!', 'success');
//       this.navCtrl.navigateForward('/tabs');
//     } catch (err) {
//       await loading.dismiss();
//       this.showToast(
//         'Erro ao fazer login. Verifique suas credenciais.',
//         'danger'
//       );
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async login() {
    if (!this.isEmailValid(this.email)) {
      this.showToast(
        '⚠️ Email inválido. Por favor, verifique o formato.',
        'warning'
      );
      return;
    }

    if (!this.email || !this.password) {
      this.showToast('⚠️ Por favor, preencha todos os campos.', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.authService.loginWithEmail(this.email, this.password);
      await loading.dismiss();
      this.showToast('✔️ Login bem-sucedido!', 'success');
      this.navCtrl.navigateForward('/tabs'); // Redireciona para a Home
    } catch (err) {
      await loading.dismiss();
      this.showToast(
        '❌ Erro ao fazer login. Verifique suas credenciais.',
        'danger'
      );
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
