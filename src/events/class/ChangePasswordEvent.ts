import { User, ValidationCode } from '@/http/model';

export class ChangePasswordEvent {
  user: User;
  date: string | Date;

  constructor(user: User, date: string | Date) {
    this.user = user;
    this.date = date;
  }
}
