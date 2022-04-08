import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../firebase/firebase.module';
import { StudentsRepository } from './repositories/student.repository';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [FirebaseModule, TypeOrmModule.forFeature([StudentsRepository])],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
