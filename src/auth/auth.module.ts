import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
