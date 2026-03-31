import { User } from '@/http/model';

export class UserConfirmedAccountEvent {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
