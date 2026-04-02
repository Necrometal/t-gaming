import { PrismaExceptionInterceptor } from './prisma-exception.interceptor';

describe('PrismaExceptionInterceptor', () => {
  it('should be defined', () => {
    expect(new PrismaExceptionInterceptor()).toBeDefined();
  });
});
