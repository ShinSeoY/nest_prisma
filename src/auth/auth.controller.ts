import { Body, Controller, Post, UseFilters, BadRequestException, Logger } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../user/dto';
import { PrismaClientExceptionFilter } from '../prisma-client-exception.filter';

@Controller('auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
