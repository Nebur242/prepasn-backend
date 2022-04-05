import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto, StudentDto } from './dtos/students.dto';
import { StudentsService } from './students.service';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOkResponse({ type: StudentDto, isArray: true })
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Post()
  @ApiCreatedResponse({ type: StudentDto })
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }
}
