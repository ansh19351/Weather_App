import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
const Cookie = require('cookie-session');
const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Cookie({keys:['cook']}));
  app.use(session({secret:'weather session', resave:false, saveUninitialized:true,}));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ["GET","POST"],
    credentials: true,}
  )
  await app.listen(PORT);
}
bootstrap();
