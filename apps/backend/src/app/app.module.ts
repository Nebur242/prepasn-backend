import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from '../modules/students/students.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TestHelpersModule } from '../modules/test-helpers/test-helpers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env, validate } from '../common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('config.typeorm'),
    }),
    StudentsModule,
    AuthModule,
    TestHelpersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
