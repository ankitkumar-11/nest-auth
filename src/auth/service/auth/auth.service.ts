import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from 'src/auth/DTOs/signUpDTO';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>, private jwtService: JwtService) { }

    async signup(user: SignUpDTO): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
        return await this.userRepository.save(user);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.userRepository.findOne({ where: { username } });
        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // const { password, ...result } = foundUser
                return foundUser;
            }

            return null;
        }
        return null

    }

    async login(userDTO: any) {
        const user = await this.userRepository.findOne({ where: { username: userDTO.username } });
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await bcrypt.compare(userDTO.password,user.password);
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: number, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: jwtConstants.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: jwtConstants.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
        await this.userRepository.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.userRepository.findOne({where:{id:userId}});
        if (!user || !user.refreshToken)
          throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await bcrypt.compare(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
      }
}
