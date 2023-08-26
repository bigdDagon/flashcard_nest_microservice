import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport} from '@nestjs/microservices';
import { JwtModule  } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: "USER_CLIENT",
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4010,
        },
      },
    ]), 
    JwtModule.register({
      global: true,
      secret: 'yoursecret',
      signOptions: { expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})

export class AuthModule {}
