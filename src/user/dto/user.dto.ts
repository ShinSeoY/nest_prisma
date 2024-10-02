import { CreateUserDto } from './create-user.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {}
// createUserDto를 선택적으로 가져오고 그중 password는 뺴고 리턴
