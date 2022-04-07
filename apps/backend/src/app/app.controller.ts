import { Controller, Get } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import { Roles } from '../auth/roles-auth.guard';

import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.ADMIN, Role.TEACHER)
  getData() {
    return this.appService.getData();
  }
}
