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
import { ClassroomsModule } from '../modules/classrooms/classrooms.module';
import { InstructorsModule } from '../modules/instructors/instructors.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { AdminsModule } from '../modules/admins/admins.module';
import { ExercisesModule } from '../modules/exercises/exercises.module';
import { QuestionsModule } from '../modules/questions/questions.module';
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
    InstructorsModule,
    AdminsModule,
    AuthModule,
    TestHelpersModule,
    GradesModule,
    CoursesModule,
    DocumentsModule,
    ChaptersModule,
    ClassroomsModule,
    CategoriesModule,
    ExercisesModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
