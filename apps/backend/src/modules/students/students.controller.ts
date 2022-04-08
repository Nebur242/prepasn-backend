import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../common/decorators/get-user.decorator';
import {
  CreateStudentDto,
  StudentDto,
  UpdateStudentDto,
} from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { Role } from '@prepa-sn/shared/enums';
import { Roles } from '../auth/roles-auth.guard';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/all')
  @ApiOkResponse({ type: StudentDto, isArray: true })
  @Roles(Role.ADMIN)
  getAllStudents(): Promise<Student[]> {
    return this.studentsService.getAllStudents();
  }

  @Post()
  @ApiCreatedResponse({ type: StudentDto })
  @Roles(Role.STUDENT)
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser('uid') uid: string
  ): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto, uid);
  }

  @Patch()
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT)
  updateStudent(
    @GetUser('uid') uid: string,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.update(uid, updateStudentDto);
  }

  @Get()
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT)
  findOne(@GetUser('uid') uid: string): Promise<Student> {
    return this.studentsService.findOne(uid);
  }
}
