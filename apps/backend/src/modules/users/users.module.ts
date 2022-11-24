import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/student.repository';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [
    FirebaseModule,
    TypeOrmModule.forFeature([UsersRepository]),
    DocumentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
