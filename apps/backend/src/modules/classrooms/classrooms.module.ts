import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomsRepository } from './repositories/classroom.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClassroomsRepository])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
