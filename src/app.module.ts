import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
      'mongodb://admin:123456@monguito:27017/tasklistdb?authSource=admin',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
