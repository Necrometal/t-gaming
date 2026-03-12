import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configRoute, configValidation } from '@/configs/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configValidation(app);
  configRoute(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
