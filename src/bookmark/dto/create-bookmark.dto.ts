import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  title: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsOptional()
  description: string;
}
