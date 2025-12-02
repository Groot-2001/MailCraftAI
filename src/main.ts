import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logEnvSafe } from './config/LogEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global API prefix
  app.setGlobalPrefix('api');

  // 2. Global validation (STRICT)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown fields
      forbidNonWhitelisted: true, // Throw error on extra fields
      transform: true,           // Convert types automatically
    }),
  );

  // 3. CORS
  app.enableCors({
    origin: '*', // later make this strict for production
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Log ENV safely
  logEnvSafe();

  console.log(`MailCraftAI server running on http://localhost:${port}`);
}

bootstrap();
