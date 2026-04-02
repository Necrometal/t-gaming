import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/http/auth/auth.service';
import {
  ChangePasswordDto,
  ConfirmAccountDto,
  ConfirmResetPasswordDto,
  RegisterUserDto,
  ResendCodeDto,
  ResetPasswordDto,
} from '@/http/global/users/dto/user.dto';
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

    // register user process
    const result = await this.authService.register({
      ...user,
      roleId: role!.id,
    });

    return result;
  }

  @Post('resend-code')
  async resendCode(@Body() code: ResendCodeDto) {
    const result = await this.authService.resendCode(code);

    return result;
  }

  @Post('confirm-account')
  async confirmAccount(@Body() code: ConfirmAccountDto) {
    await this.authService.confirmAccount(code);

    return {
      message: 'Account validate successfully',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() user: ResetPasswordDto) {
    const result = await this.authService.resetPassword(user);

    return result;
  }

  @Post('confirm-reset-password')
  async resetPasswordConfirm(@Body() code: ConfirmResetPasswordDto) {
    const result = await this.authService.resetPasswordConfirm(code);

    return {
      message: 'Reset password validated successfully, please set new password',
      data: result,
    };
  }

  @Post('change-password')
  async changePassword(@Body() password: ChangePasswordDto) {
    const result = await this.authService.changePassword(password);
    return result;
  }
}
