import { NestFactory } from '@nestjs/core';
// import * as admin from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  // admin.initializeApp({
  //   credential: admin.credential.cert(
  //     'src/config/firebase-service-account.json',
  //   ),
  // });

  const app = await NestFactory.create(AppModule);
  app.enableCors(); //só mudou isso
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
