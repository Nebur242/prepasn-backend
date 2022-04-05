import { Controller, Get } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import { Roles } from '../auth/roles-auth.guard';

import { AppService } from './app.service';

@Controller()
@Roles(Role.ADMIN, Role.TEACHER)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
