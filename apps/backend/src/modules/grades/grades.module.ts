import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesRepository } from './repositories/grade.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GradesRepository])],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
