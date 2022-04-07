import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../modules/students/entities/student.entity';
import { StudentsModule } from '../modules/students/students.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC?.toLowerCase() === 'true',
      logging: process.env.DB_LOGGING?.toLowerCase() === 'true',
      entities: [Student],
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL?.toLowerCase() === 'true',
    }),
    StudentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
