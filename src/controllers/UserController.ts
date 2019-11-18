import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { IsValid, IsNotEmpty } from '@nestcloud/validations';
import { User } from '../models';
import { UserService } from '../services';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  async getUsers(@Query('remote') isRemote: boolean, @Req() req) {
    if (isRemote) {
      return await this.userService.getRemoteUsers();
    }
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body('user', new IsValid()) user: User) {
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body('name', new IsNotEmpty()) name: string) {
  }
}
