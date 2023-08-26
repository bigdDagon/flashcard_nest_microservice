import { Controller, UseGuards, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
// ... confirmed
  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ email: data.email });
  }

  @UseGuards(AuthGuard)
  @Get('greet') 
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}

