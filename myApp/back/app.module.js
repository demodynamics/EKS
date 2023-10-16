var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, RequestMethod } from '@nestjs/common';
import { ListModule } from './modules/list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm.config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthMiddleware } from './middlewares';
let AppModule = class AppModule {
    configure(consumer) {
        const authWhiteList = [
            { url: '/admin/login' },
            { url: '/admin/register' },
            { url: '/list/add' }
        ];
        consumer.apply(AuthMiddleware(authWhiteList)).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        });
    }
};
AppModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forRoot(config),
            ListModule,
            AdminModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map