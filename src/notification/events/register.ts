import { User } from '@/http/model';
import { Command } from '@nestjs/cqrs';

export class RegisteredUserCommand extends Command<{
  actionId: string; // This type represents the command execution result
}> {
  constructor(public readonly user: User) {
    super();
  }
}
