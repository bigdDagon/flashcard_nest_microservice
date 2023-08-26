import { Injectable, Inject, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { TimeoutError, catchError, throwError, timeout } from 'rxjs';
import { compareSync } from 'bcrypt';
import { Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  async register(user: User) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async login(query: any) {
    
    const user = await this.userRepository.findOne({ where: { email: query.email} });
    console.log(user);
    if ( !compareSync(query.password, user?.password) ) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ role: 'user', cmd: 'get' }, { email })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      if(compareSync(password, user?.password)) {
        return user;
      }
      return null;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }



  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}