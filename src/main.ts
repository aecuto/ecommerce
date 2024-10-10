import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const title = 'eccomerce apis';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion(`1.0`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options = {
    customSiteTitle: title,
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
    },
  };
  SwaggerModule.setup('api', app, document, options);

  await app.listen(3000);
}
bootstrap();
