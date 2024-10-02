import { Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/dto';
import { toUserDto } from '../user/entity/user.entity';
import { User } from '@prisma/client';

// import { PrismaService } from '../prisma/prisma.service';
//import { User } from "@prisma/client";

// import { hash } from 'bcrypt';
// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService
  ) {}

  public async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS'
    };

    try {
      status.data = toUserDto(await this.usersService.create(userDto));
    } catch (err) {
      this.logger.error(err);
      status = {
        success: false,
        message: err
      };
    }
    return status;
  }

  public async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token,
      data: user
    };
  }

  private _createToken({ id }): any {
    const user: JwtPayload = { id };
    const authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization: authorization
    };
  }

  public async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findByPayload(payload);
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: UserDto;
}
