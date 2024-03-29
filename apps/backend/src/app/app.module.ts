import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/auth/auth.module';
import { TestHelpersModule } from '../modules/test-helpers/test-helpers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env, validate } from '../common/config';
import { GradesModule } from '../modules/grades/grades.module';
import { CoursesModule } from '../modules/courses/courses.module';
import { DocumentsModule } from '../modules/documents/documents.module';
import { ChaptersModule } from '../modules/chapters/chapters.module';
import { ClassroomsModule } from '../modules/classrooms/classrooms.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { ExercisesModule } from '../modules/exercises/exercises.module';
import { QuestionsModule } from '../modules/questions/questions.module';
import { UsersModule } from '../modules/users/users.module';
import { SectionsModule } from '../modules/sections/sections.module';
import { CheckoutModule } from '../modules/checkout/checkout.module';
import { ReviewsModule } from '../modules/reviews/reviews.module';
import { CartItemModule } from '../modules/cart-item/cart-item.module';
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
    AuthModule,
    CartItemModule,
    TestHelpersModule,
    GradesModule,
    CoursesModule,
    DocumentsModule,
    ChaptersModule,
    ClassroomsModule,
    CategoriesModule,
    ExercisesModule,
    QuestionsModule,
    UsersModule,
    SectionsModule,
    CheckoutModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
