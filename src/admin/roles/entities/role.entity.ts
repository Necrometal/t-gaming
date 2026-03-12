import { IsNotEmpty, IsString } from 'class-validator';

export class Role {}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
