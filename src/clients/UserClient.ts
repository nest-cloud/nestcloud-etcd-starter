import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/http';
import { Loadbalanced } from '@nestcloud/loadbalance';
import { User } from '../models';

@Injectable()
@Loadbalanced('nestcloud-starter-service')
export class UserClient {
  @Get('/users')
  async getUsers(): Promise<User[] | any> {
  }
}
