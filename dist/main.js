"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Cookie = require('cookie-session');
const PORT = 3002;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    dotenv.config();
    app.useGlobalPipes(new common_1.ValidationPipe);
    app.use(Cookie({ keys: ['cook'] }));
    app.use(session({ secret: 'weather session', resave: false, saveUninitialized: true, }));
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Weather API')
        .setDescription('A simple Weather API')
        .setVersion('1.0')
        .addTag('weather')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map