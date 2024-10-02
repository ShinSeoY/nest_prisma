import { User } from '@prisma/client';
import { UserDto } from '../dto';

export class UserEntity implements User {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  //
  public email: string;
  public password: string;
  public name: string | null;
  //   public role: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    // short for 👇
    // this.id = partial.id;
    // this.createdAt = partial.createdAt;
    // this.updatedAt = partial.updatedAt;
    // this.login = partial.login;
    // this.password = partial.password;
    // this.name = partial.name;
    // this.surname = partial.surname;
    // this.description = partial.description;
    // this.role = partial.role;
    // this.updated = partial.updated;
  }
}

export const toUserDto = (data: UserEntity): UserDto => {
  const { password, createdAt, updatedAt, ...result } = data;
  return result;
};
