import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../modules/students/entities/student.entity';
import { StudentsModule } from '../modules/students/students.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres' | 'sqlite',
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC?.toLowerCase() === 'true',
      logging: process.env.DB_LOGGING?.toLowerCase() === 'true',
      entities: [Student],
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }),
    StudentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
