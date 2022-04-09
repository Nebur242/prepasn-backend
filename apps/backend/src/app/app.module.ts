import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../modules/students/entities/student.entity';
import { StudentsModule } from '../modules/students/students.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TestHelpersModule } from '../modules/test-helpers/test-helpers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        ssl: configService.get<string>('DB_SSL')?.toLowerCase() === 'true',
        logging:
          configService.get<string>('DB_LOGGING')?.toLowerCase() === 'true',
        synchronize:
          configService.get<string>('DB_SYNC')?.toLowerCase() === 'true',
        entities: [Student],
      }),
    }),
    StudentsModule,
    AuthModule,
    TestHelpersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
