import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dtos/students.dto';
import { StudentsService } from './students.service';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }
}
