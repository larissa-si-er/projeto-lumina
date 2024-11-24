import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.router.navigateByUrl('login'); //mudaaaaar pra splash <<<<<<<<<<<<<<<<<<<<
    // });
  }
}

//TESTE NOTIFICAÇOES:
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Platform } from '@ionic/angular';
// import { NotificationService } from './services/notification.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor(
//     private router: Router,
//     private platform: Platform,
//     private notificationService: NotificationService // Serviço de notificação
//   ) {
//     this.initializeApp();
//   }

//   // Inicialização do app
//   initializeApp() {
//     this.platform.ready().then(() => {
//       // Redireciona para a tela de login (ajuste futuramente para o splash se necessário)
//       this.router.navigateByUrl('login');

//       // Inicializa notificações após o dispositivo estar pronto
//       this.initializeNotifications();
//     });
//   }

//   // Inicializa notificações locais e push
//   private initializeNotifications() {
//     // Inicializar notificações push
//     this.notificationService.initializePushNotifications();

//     // Opcional: Agendar uma notificação local de teste
//     this.notificationService.scheduleLocalNotification(
//       'Bem-vindo!',
//       'Você está pronto para usar notificações no seu app.'
//     );
//   }
// }

// ANTES-------------------------------------------------------------------
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor() {  }
// }
