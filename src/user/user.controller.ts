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
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums/role.enum';

@Controller('user')
@UseFilters(PrismaClientExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post('')
  // public async create(@Body() dto: CreateUserDto) {
  //   return toUserDto(await this.userService.create(dto));
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @Roles(Role.USER)
  public async me(@Request() req) {
    console.log('req.user: ', req.user);
    return toUserDto(await this.userService.findByPayload(req.user));
  }
}
