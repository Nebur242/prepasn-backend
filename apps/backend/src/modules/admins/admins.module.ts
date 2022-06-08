import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from './repositories/admin.repository';

@Module({
  imports: [FirebaseModule, TypeOrmModule.forFeature([AdminsRepository])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
