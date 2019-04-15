import { Injectable } from '@nestjs/common';
import { ConfigService } from '../common/config/config.service';
import { Prisma } from '../generated/prisma-client';

// @Injectable()
// export class PrismaService extends Prisma {
//   constructor() {
//     super({
//       endpoint: 'https://us1.prisma.sh/gachen95-72dde9/todo-api/dev',
//       debug: false,
//     });
//   }
// }


// TODO: prisma-client issue
// workaround
// https://github.com/nestjs/nest/issues/1277
// https://github.com/nestjs/nest/issues/1129
@Injectable()
export class PrismaService {
  client: Prisma;

  constructor(configService: ConfigService) {
    this.client = new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT || configService.getString('PRISMA_ENDPOINT'),
      secret: process.env.PRISMA_SECRET || configService.getString('PRISMA_SECRET'),
      debug: (process.env.PRISMA_DEBUG === 'true') || configService.getBoolean('PRISMA_DEBUG'),
    });
  }
}