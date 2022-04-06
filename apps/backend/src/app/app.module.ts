import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../modules/students/entities/student.entity';
import { StudentsModule } from '../modules/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres' | 'sqlite',
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC?.toLowerCase() === 'true',
      logging: true,
      entities: [Student],
    }),
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
