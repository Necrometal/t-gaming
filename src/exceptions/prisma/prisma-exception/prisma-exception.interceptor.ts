import { UNIQUE_ERROR_KEY } from '@/helpers/decorator/unique-error/unique-error.decorator';
import { Prisma } from '@/prisma/client';
import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable } from 'rxjs';

/**
 * Interceptor to override prisma unique field error
 */
@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const controller = context.getClass();

    let customFields: string[] | string = this.reflector.getAllAndOverride<
      string[]
    >(UNIQUE_ERROR_KEY, [handler, controller]);

    return next.handle().pipe(
      catchError((error: any) => {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          if (Array.isArray(customFields))
            customFields = customFields.join(', ');
          throw new ConflictException(`${customFields} already exists`);
        }

        throw error;
      }),
    );
  }
}
