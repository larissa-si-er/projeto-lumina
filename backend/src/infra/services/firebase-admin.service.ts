import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    if (!admin.apps.length) {
      //   admin.initializeApp({
      //     credential: admin.credential.applicationDefault(),
      //   });
      admin.initializeApp({
        credential: admin.credential.cert(
          'src/config/firebase-service-account.json',
        ), // Caminho para o arquivo
      });
    }
  }

  async sendPushNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
