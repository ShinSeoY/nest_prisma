import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  Request,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { toUserDto } from './entity/user.entity';
import { PrismaClientExceptionFilter } from '../prisma-client-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseFilters(PrismaClientExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post('')
  // public async create(@Body() dto: CreateUserDto) {
  //   return toUserDto(await this.userService.create(dto));
  // }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  public async me(@Request() req) {
    console.log('req.user: ', req.user);
    return toUserDto(await this.userService.findByPayload(req.user));
  }
}
