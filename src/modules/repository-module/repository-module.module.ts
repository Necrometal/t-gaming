import { Global, Module } from '@nestjs/common';
import { UserRepositoryModule } from '@/repositories/user-repository/user-repository.module';
import { RoleRepositoryModule } from '@/repositories/role-repository/role-repository.module';
import { ValidationCodeRepositoryModule } from '@/repositories/validation-code-repository/validation-code-repository.module';
import { ProfileRepositoryModule } from '@/repositories/profile-repository/profile-repository.module';

@Global()
@Module({
  imports: [
    UserRepositoryModule,
    RoleRepositoryModule,
    ValidationCodeRepositoryModule,
    ProfileRepositoryModule,
  ],
  exports: [
    UserRepositoryModule,
    RoleRepositoryModule,
    ValidationCodeRepositoryModule,
    ProfileRepositoryModule,
  ],
})
export class RepositoryModuleModule {}
