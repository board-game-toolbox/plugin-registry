import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/data/data.service';
import { LoginBody, RegisterBody } from './types';
import { SpecialError } from 'src/type';
import { STATUS_CODE } from 'src/utils/code';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(loginForm: LoginBody): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        usn: loginForm.usn,
      },
    });

    if (!user) throw new SpecialError(STATUS_CODE.USER_NOT_FOUND);

    if (loginForm.pwd !== user.pwd)
      throw new Error('invalid username or password');

    return user;
  }

  async registerUser(registerForm: RegisterBody): Promise<User> {
    if (
      (await this.prisma.user.count({
        where: {
          usn: registerForm.usn,
        },
      })) !== 0
    )
      throw new Error('username already exists');

    const user = await this.prisma.user.create({
      data: {
        usn: registerForm.usn,
        pwd: registerForm.pwd,
      },
    });

    return user;
  }
}
