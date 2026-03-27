import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/http/auth/auth.service';
import { RegisterUserDto } from '@/http/global/users/dto/user.dto';
import { PrismaService } from '@/prisma.service';
import { RolesService } from '@/http/global/roles/roles.service';
import { ROLE_USER } from '@/constantes/role';
import { UniqueError } from '@/helpers/decorator/unique-error/unique-error.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {}

  @Post('register')
  @UniqueError('email')
  async register(@Body() user: RegisterUserDto) {
    // use user role for register user
    const role = await this.rolesService.findRoleByTag(ROLE_USER);
    // create user
    const result = await this.authService.register({
      ...user,
      roleId: role!.id,
    });

    return result;
  }
}
