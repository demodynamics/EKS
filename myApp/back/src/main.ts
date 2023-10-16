import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as cors from 'cors';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.use(cors())
  
  app.setGlobalPrefix('api');

  await app.listen(process.env.APP_PORT || 5003);
  process.stdout.write(`Listening on port ${process.env.APP_PORT || 5003}`);
}

bootstrap();