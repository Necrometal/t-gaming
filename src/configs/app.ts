import { CustomValidationPipe } from '@/pipe/custom-validation-pipe/custom-validation-pipe.pipe';
import { INestApplication, ValidationPipe } from '@nestjs/common';

export const configValidation = (app: INestApplication<any>) => {
  app.useGlobalPipes(new CustomValidationPipe());
};

export const configRoute = (app: INestApplication<any>) => {
  app.setGlobalPrefix('admin', {
    exclude: [],
  });
};
