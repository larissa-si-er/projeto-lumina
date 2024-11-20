import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  phone: string;
  password: string;
  endereco: string;
  email: string;
  totalHours: number;
  role: $Enums.userRole;
  // firebaseUid: string; // Adicione esta propriedade
}
