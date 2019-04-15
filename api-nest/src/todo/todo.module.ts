import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service'
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  providers: [
    TodoResolver,
    TodoService
  ],
  imports: [
    PrismaModule,
    LoggerModule
  ],
})
export class TodoModule {}
