import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from '../modules/students/students.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TestHelpersModule } from '../modules/test-helpers/test-helpers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env, validate } from '../common/config';
import { GradesModule } from '../modules/grades/grades.module';
import { CoursesModule } from '../modules/courses/courses.module';
import { DocumentsModule } from '../modules/documents/documents.module';
import { ChaptersModule } from '../modules/chapters/chapters.module';
// import { MulterModule } from '@nestjs/platform-express';
// import FirebaseStorage from 'multer-firebase-storage';
import { UploadsModule } from '../modules/uploads/uploads.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
      validate,
    }),
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     storage: FirebaseStorage({
    //       bucketName: config.get('config.firebase.storageBucket'),
    //       credentials: {
    //         clientEmail: config.get('config.firebase.clientEmail'),
    //         privateKey: config.get('config.firebase.privateKey'),
    //         projectId: config.get('config.firebase.projectId'),
    //       },
    //     }),
    //   }),
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('config.typeorm'),
    }),
    StudentsModule,
    AuthModule,
    TestHelpersModule,
    GradesModule,
    CoursesModule,
    DocumentsModule,
    ChaptersModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
