import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDTO } from './DTOs/signUpDTO';
import { RefreshTokenGuard } from './guards/refresh.guard';
import { AuthService } from './service/auth/auth.service';
import { Users } from './user.entity';

@Controller('api/v1/auth/')
export class AuthController {
    constructor(private usersService: AuthService) { }

    @Post('signup')
    async signup(@Body() user: SignUpDTO): Promise<Users> {
        return this.usersService.signup(user);
    }

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user) {
        return this.usersService.login(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/test')
    test(@Request() req: any) {
        console.log(req.user)
        return { hello: 'hello' }
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Request() req: any) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.usersService.refreshTokens(userId, refreshToken);
    }
}