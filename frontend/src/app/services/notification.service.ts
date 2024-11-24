import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  async initializePushNotifications() {
    // Solicita permissão para notificações push
    const permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive === 'granted') {
      await PushNotifications.register();

      // Obtém o token do dispositivo
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ', token.value);
        // Enviar token para o backend
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ', error);
      });
    }
  }

  async scheduleLocalNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: new Date().getTime(),
          title,
          body,
          schedule: { at: new Date(new Date().getTime() + 5000) },
        },
      ],
    });
  }
}
