import { $Enums, Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  phone: string;
  password: string;
  // endereco: string;
  endereco: Prisma.JsonValue;
  email: string;
  totalHours: number;
  role: $Enums.userRole;
  // firebaseUid: string; // Adicione esta propriedade
}

// export class UserEntity {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   endereco: {
//     zipcode: string;
//     road: string;
//     state: string;
//     city: string;
//     neighborhood: string;
//   } | null; // Aceita ou um objeto ou null
//   role: string;
//   totalHours: number;
// }
