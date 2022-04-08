import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { TestHelpersController } from './test-helpers.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [TestHelpersController],
})
export class TestHelpersModule {}
