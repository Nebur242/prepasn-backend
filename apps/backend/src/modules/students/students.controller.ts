import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import {
  CreateStudentDto,
  StudentDto,
  UpdateStudentDto,
} from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { Role } from '@prepa-sn/shared/enums';
import { Admin, Authenticated, Roles } from '../auth/roles-auth.guard';
import { JwtClaims } from '@prepa-sn/backend/common/types/claims.type';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { FirebaseService } from '../firebase/firebase.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@ControllerWithApiTags('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Get('/all')
  @ApiOkResponse({ type: StudentDto, isArray: true })
  @Admin()
  getAllStudents(): Promise<Student[]> {
    return this.studentsService.getAllStudents();
  }

  @Post('/create')
  @ApiCreatedResponse({ type: StudentDto })
  @Authenticated()
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Claims() claims: JwtClaims
  ): Promise<Student> {
    return this.studentsService.createStudent(createStudentDto, claims);
  }

  @Get()
  @ApiOkResponse({ type: StudentDto, isArray: true })
  @Admin()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<Student>> {
    return this.studentsService.paginate({
      page,
      limit,
      route: '/students',
    });
  }

  @Post()
  @Admin()
  @ApiOkResponse({ type: StudentDto })
  async create(@Body() createInstructorDto: CreateStudentDto) {
    const createdUser = await this.firebaseService.createUser(
      createInstructorDto.email,
      createInstructorDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [Role.STUDENT]);
    return this.studentsService.create({
      ...createInstructorDto,
      uid: createdUser.uid,
    });
  }

  @Patch(':uid')
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT, Role.ADMIN)
  updateStudent(
    @Param('uid') uid: string,
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.update(uid, updateStudentDto);
  }

  @Get(':uid')
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.STUDENT, Role.ADMIN)
  findOne(@Param('uid') uid: string): Promise<Student> {
    return this.studentsService.findOne(uid);
  }

  @Delete(':uid')
  @ApiOkResponse({ type: StudentDto })
  @Roles(Role.ADMIN)
  remove(@Param('uid') uid: string): Promise<Student> {
    return this.studentsService.removeUser(uid);
  }
}
