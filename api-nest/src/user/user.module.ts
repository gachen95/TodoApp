import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UserResolver],
})
export class UserModule { }
