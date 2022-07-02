import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorsRepository } from './repositories/instructor.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    FirebaseModule,
    AuthModule,
    TypeOrmModule.forFeature([InstructorsRepository]),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
