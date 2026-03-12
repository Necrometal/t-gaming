import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const extraProperties = errors
          .filter((err) => err.constraints?.whitelistValidation)
          .map((err) => err.property);

        if (extraProperties.length > 0) {
          return new BadRequestException({
            statusCode: 400,
            message: extraProperties.map((prop: string) => {
              return `property ${prop} is not recognized`;
            }),
            error: 'Bad Request',
          });
        }

        // Handle normal validation errors
        const messages = errors
          .map((err) => (err.constraints ? Object.values(err.constraints) : []))
          .flat();

        return new BadRequestException({
          statusCode: 400,
          message: messages,
          error: 'Bad Request',
        });
      },
    });
  }
}
