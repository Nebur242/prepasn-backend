import { Chapter } from '../../modules/chapters/entities/chapter.entity';
import { Course } from '../../modules/courses/entities/course.entity';
import { Grade } from '../../modules/grades/entities/grade.entity';
import { Student } from '../../modules/students/entities/student.entity';

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
  entities: [Student, Grade, Course, Chapter],
};
