import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsEmail } from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

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

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResendCodeDto {
  @IsString()
  @IsNotEmpty()
  validationCodeToken: string;
}

export class ConfirmAccountDto {
  @IsString()
  @IsNotEmpty()
  validationCodeToken: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ConfirmResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  validationCodeToken: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  validationCodeToken: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
