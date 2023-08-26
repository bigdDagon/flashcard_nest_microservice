import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'yoursecret',
      signOptions: {expiresIn: '60s'}
    })
  ],

  controllers: [AppController],
  providers: [{
    provide: "FLASHCARD_SERVICE",
    inject: [ConfigService ],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get('FLASHCARD_SERVICE_HOST'),
          port: configService.get("FLASHCARD_SERVICE_PORT"),
        }
      })
    }
  }],
})

export class AppModule {}
