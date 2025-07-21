import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Task],
      synchronize: true,
      logging: true//process.env.NODE_ENV === 'development',
    }),
    TasksModule,
  ],
})
export class AppModule {}