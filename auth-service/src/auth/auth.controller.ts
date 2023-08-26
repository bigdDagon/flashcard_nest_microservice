import { Controller, Post, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
// ... confirmed
  @Post('register')
  async register(@Req() req) {
    return this.authService.register(req.body);
  }

  
// ... confirmed
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.body);
  }
  
  @MessagePattern({ role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);
      return res;
    } catch(e) {
      Logger.log(e);
      return false;
    }
  }
}
