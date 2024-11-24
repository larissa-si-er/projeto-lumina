import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService], // Exporta para outros módulos
})
export class FirebaseAdminModule {}
