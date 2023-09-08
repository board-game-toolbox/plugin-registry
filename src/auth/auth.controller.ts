import { Res, SpecialError } from './../type';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBody, RegisterBody } from './types';
import { STATUS_CODE } from 'src/utils/code';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginBody): Promise<Res<string>> {
    try {
      const user = await this.authService.validateUser(body);
      return {
        code: STATUS_CODE.SUCCESS,
        data: getJwtToken(this.jwtService, user),
      };
    } catch (e) {
      // @TODO common process
      if (e instanceof SpecialError) {
        return {
          code: e.code,
        };
      }

      return {
        code: STATUS_CODE.ERROR,
        msg: (e as Error).message,
      };
    }
  }

  @Post('register')
  async register(@Body() body: RegisterBody): Promise<Res<string>> {
    try {
      const user = await this.authService.registerUser(body);
      return {
        code: STATUS_CODE.SUCCESS,
        data: getJwtToken(this.jwtService, user),
      };
    } catch (e) {
      return {
        code: STATUS_CODE.ERROR,
        msg: (e as Error).message,
      };
    }
  }
}

function getJwtToken(jwtService: JwtService, user: User): string {
  return jwtService.sign({
    sub: user.id,
    username: user.usn,
  });
}
