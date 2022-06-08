import { Admin } from '@prepa-sn/backend/modules/admins/entities/admin.entity';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Classroom } from '@prepa-sn/backend/modules/classrooms/entities/classroom.entity';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Instructor } from '@prepa-sn/backend/modules/instructors/entities/instructor.entity';
import { Student } from '@prepa-sn/backend/modules/students/entities/student.entity';

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
    Student,
    Instructor,
    Admin,
    Grade,
    Course,
    Chapter,
    Classroom,
  ],
};
