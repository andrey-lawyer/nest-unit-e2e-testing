import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
  Logger.log(`Listening on http://localhost:${PORT}`);
}
bootstrap();
