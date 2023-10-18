import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const Cookie = require('cookie-session');
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Cookie({keys:['cook']}));
  await app.listen(PORT);
}
bootstrap();
