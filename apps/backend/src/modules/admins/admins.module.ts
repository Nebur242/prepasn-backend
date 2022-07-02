import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from './repositories/admin.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AdminsRepository])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
