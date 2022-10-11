import { Category } from '@prepa-sn/backend/modules/categories/entities/category.entity';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Classroom } from '@prepa-sn/backend/modules/classrooms/entities/classroom.entity';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Exercise } from '@prepa-sn/backend/modules/exercises/entities/exercise.entity';
import { Section } from '@prepa-sn/backend/modules/sections/entities/section.entity';

import { Question } from '@prepa-sn/backend/modules/questions/entities/question.entity';
import { User } from '@prepa-sn/backend/modules/users/entities/user.entity';
import { Cart } from '@prepa-sn/backend/modules/cart/entities/cart.entity';

export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL?.toLowerCase() === 'true',
  logging: process.env.DB_LOGGING?.toLowerCase() === 'true',
  synchronize: process.env.DB_SYNC?.toLowerCase() === 'true',
  entities: [
    Document,
    Grade,
    Course,
    Chapter,
    Classroom,
    Category,
    Exercise,
    Section,
    Question,
    User,
    Cart,
  ],
};
