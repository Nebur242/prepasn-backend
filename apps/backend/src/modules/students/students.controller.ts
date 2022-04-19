import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Claims } from '../../common/decorators/get-user.decorator';
import {
  CreateStudentDto,
  StudentDto,
  UpdateStudentDto,
} from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { Role } from '@prepa-sn/shared/enums';
import { Authenticated, Roles } from '../auth/roles-auth.guard';
import { JwtClaims } from '../../common/types/claims.type';

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
  @Authenticated()
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Claims() claims: JwtClaims
  ): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto, claims);
  }

  @Patch()
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT)
  updateStudent(
    @Claims('uid') uid: string,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.update(uid, updateStudentDto);
  }

  @Get()
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT)
  findOne(@Claims('uid') uid: string): Promise<Student> {
    return this.studentsService.findOne(uid);
  }
}
