import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() payload: AuthDto) {
    const user = await this.userService.findOneBy({
      username: payload.username,
    });
    if (user) throw new BadRequestException('User exists!');

    const hash = await argon2.hash(payload.password);
    return this.userService.save({ ...payload, password: hash });
  }

  @Post('login')
  async login(
    @Body() payload: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOneBy({
      username: payload.username,
    });
    if (!user) throw new UnauthorizedException('User does not exist');

    const verify = await argon2.verify(user.password, payload.password);
    if (!verify) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.getToken(user);
    response.cookie('token', token);

    return token;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');

    return { msg: 'logout successfully!' };
  }

  async getToken(user: UserEntity) {
    return this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn:
          this.configService.get<string>('JWT_ACCESS_SECRET_EXPIRY') || '15m',
      },
    );
  }
}
