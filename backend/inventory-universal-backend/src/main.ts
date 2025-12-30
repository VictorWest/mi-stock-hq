import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const FRONTEND_URL = 'http://localhost:8080'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
