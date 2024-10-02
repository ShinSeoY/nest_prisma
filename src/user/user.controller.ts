import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { toUserDto } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  public async create(@Body() dto: CreateUserDto) {
    return toUserDto(await this.userService.create(dto));
  }

  @Get()
  getHello(): any {
    return this.userService.findAll();
  }
}
