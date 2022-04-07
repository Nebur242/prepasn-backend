import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateStudentDto,
  StudentDto,
  UpdateStudentDto,
} from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOkResponse({ type: StudentDto, isArray: true })
  getAllStudents(): Promise<Student[]> {
    return this.studentsService.getAllStudents();
  }

  @Post()
  @ApiCreatedResponse({ type: StudentDto })
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StudentDto })
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: StudentDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return this.studentsService.findOne(id);
  }
}
