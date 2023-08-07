import {
  BeforeApplicationShutdown,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, BeforeApplicationShutdown
{
  async onModuleInit() {
    // Required to stringfy BigInt values
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };
    await this.$connect();
  }

  async beforeApplicationShutdown() {
    await this.$disconnect();
  }
}
