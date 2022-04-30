import { Body, Post } from '@nestjs/common';
import { TestOnly } from '@prepa-sn/shared/guards';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateTestUserDto, LoginTestUserDto } from './test-helpers.dto';
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';

@Controller('test-helpers')
@TestOnly()
export class TestHelpersController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('/user/register')
  async registerTestUser(@Body() createTestUserDto: CreateTestUserDto) {
    const createdUser = await this.firebaseService.createUser(
      createTestUserDto.email,
      createTestUserDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [
      createTestUserDto.role,
    ]);
    return this.loginTestUser({
      email: createTestUserDto.email,
      password: createTestUserDto.password,
    });
  }

  @Post('/user/login')
  async loginTestUser(@Body() loginTestUserDto: LoginTestUserDto) {
    return this.firebaseService.login(
      loginTestUserDto.email,
      loginTestUserDto.password
    );
  }
}
