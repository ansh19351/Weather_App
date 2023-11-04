import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const Cookie = require('cookie-session');
// Use reverse proxy
const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe);
  app.use(Cookie({keys:['cook']}));
  app.use(session({secret:'weather session', resave:false, saveUninitialized:true,}));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ["GET","POST"],
    credentials: true,}
  )
  const config = new DocumentBuilder()
  .setTitle('Weather API')
  .setDescription('A simple Weather API')
  .setVersion('1.0')
  .addTag('Weather')
  .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
