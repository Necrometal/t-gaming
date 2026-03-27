import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsEmail,
} from 'class-validator';

export class User {}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;
}

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
