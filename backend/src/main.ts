// import { NestFactory } from '@nestjs/core';
// // import * as admin from 'firebase-admin';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   // admin.initializeApp({
//   //   credential: admin.credential.cert(
//   //     'src/config/firebase-service-account.json',
//   //   ),
//   // });

//   const app = await NestFactory.create(AppModule);
//   app.enableCors(); //só mudou isso
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Serve arquivos estáticos da pasta 'uploads'
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT ?? 3000);
  console.log('Servidor rodando em http://localhost:3000');
}
bootstrap();
