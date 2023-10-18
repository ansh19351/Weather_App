"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Cookie = require('cookie-session');
const PORT = 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(Cookie({ keys: ['cook'] }));
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map