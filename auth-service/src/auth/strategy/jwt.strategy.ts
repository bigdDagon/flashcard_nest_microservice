import { Injectable } from "@nestjs/common";
import { PassportStrategy  } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'yoursecret'
      });
    }
  
    async validate(payload) {
      return { id: payload.sub, user: payload.user};
    }
}

