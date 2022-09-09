import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
 constructor() {
   super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     ignoreExpiration: false,
     secretOrKey: jwtConstants.JWT_ACCESS_SECRET,
   });
 }

 async validate(payload: any) {
  console.log(payload)
   return { userId: payload.sub, username: payload.username, role: payload.role };
 }
}