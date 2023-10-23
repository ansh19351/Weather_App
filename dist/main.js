"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const Cookie = require('cookie-session');
const PORT = 3002;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(Cookie({ keys: ['cook'] }));
    app.use(session({ secret: 'weather session', resave: false, saveUninitialized: true, }));
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true,
    });
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map