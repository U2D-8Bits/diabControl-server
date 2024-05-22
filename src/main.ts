/* eslint-disable prettier/prettier */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Mostramos en consola la conección a la base de datos
  console.log(`Server running on PORT: ${process.env.DB_PORT ?? 3000}`);


  await app.listen(process.env.DB_PORT ?? 3000);
}
bootstrap();
