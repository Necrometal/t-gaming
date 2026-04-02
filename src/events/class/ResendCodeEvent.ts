import { User, ValidationCode } from '@/http/model';

export class ResendCodeEvent {
  user: User;
  validationCode: ValidationCode;

  constructor(user: User, validation: ValidationCode) {
    this.user = user;
    this.validationCode = validation;
  }
}
