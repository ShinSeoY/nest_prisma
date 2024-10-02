import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(userDto: CreateUserDto): Promise<any> {
    // check if the user exists in the db
    const userInDb = await this.prisma.user.findUnique({
      where: { email: userDto.email }
    });
    if (userInDb) {
      throw new ConflictException('user_already_exist');
    }
    return await this.prisma.user.create({
      data: { ...userDto } // password: await hash(userDto.password, 10)
    });
  }

  //   public async updatePassword(payload: UpdatePasswordDto, id: string): Promise<UserEntity> {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id }
  //     });
  //     if (!user) {
  //       throw new UnauthorizedException('invalid_credentials');
  //     }
  //     // compare passwords
  //     const areEqual = await compare(payload.old_password, user.password);
  //     if (!areEqual) {
  //       throw new UnauthorizedException('invalid_credentials');
  //     }
  //     return await this.prisma.user.update({
  //       where: { id },
  //       data: { password: await hash(payload.new_password, 10) }
  //     });
  //   }

  async findAll() {
    return this.prisma.user.findMany();
  }

  //   async findOne(id: number) {
  //     return this.prisma.user.findUnique({ where: { id } });
  //   }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  //     return this.prisma.user.update({
  //       where: { id },
  //       data: updateUserDto
  //     });
  //   }

  //   async remove(id: number) {
  //     return this.prisma.user.delete({ where: { id } });
  //   }
}
