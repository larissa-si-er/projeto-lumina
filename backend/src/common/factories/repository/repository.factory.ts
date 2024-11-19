import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export class RepositoryFactory<K, T = void, J = void> {
  @Inject(PrismaService)
  protected readonly prismaService: PrismaService;

  constructor(public model: string) {}

  createMany(data: T[]) {
    return this.prismaService[this.model].createMany({
      data,
      skipDuplicates: true,
    });
  }

  create(data: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...data,
      },
    });
  }

  findAll(): Promise<K[]> {
    return this.prismaService[this.model].findMany();
  }

  findById(id: string): Promise<K> {
    return this.prismaService[this.model].findUnique({
      where: {
        id: id,
      },
    });
  }

  upsert({ id, ...data }: T & { id?: string }): Promise<K> {
    return this.prismaService[this.model].upsert({
      create: { ...data },
      update: { ...data },
      where: { id },
    });
  }

  update({ id, ...data }: J & { id: string }): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  count(where: any): Promise<number> {
    return this.prismaService[this.model].count({ where });
  }

  delete(id: string): Promise<K | null> {
    return this.prismaService[this.model].delete({
      where: {
        id,
      },
    });
  }

  deleteMany() {
    return this.prismaService[this.model].deleteMany();
  }
}

// import { PrismaService } from 'src/infra/database/prisma/prisma.service';

// export class RepositoryFactory<T> {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly model: string,
//   ) {}

//   async create(data: T) {
//     const modelDelegate = this.prismaService[this.model];
//     if (!modelDelegate || typeof modelDelegate.create !== 'function') {
//       throw new Error(
//         `Model ${this.model} is invalid or does not support 'create'`,
//       );
//     }

//     return modelDelegate.create({ data });
//   }

//   // Outras operações genéricas (find, update, delete, etc.) podem ser adicionadas aqui
// }
