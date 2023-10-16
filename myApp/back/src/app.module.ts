import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { ListModule } from './modules/list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm.config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthMiddleware, IWhiteListItem } from './middlewares';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(__dirname)
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ListModule,
    AdminModule,
	 ServeStaticModule.forRoot({
		rootPath: join(__dirname, '..', '..', 'back_expensive', 'image'),
		serveRoot : "/api/imgs"
    })
  ],
  controllers: [],
  providers: [],
})


export class AppModule implements NestModule {
  public configure (consumer: MiddlewareConsumer): void {
    const authWhiteList: IWhiteListItem[] = [
      { url: '/api/admin/login' },
      { url: '/api/admin/register' },
      { url: '/api/list/add' }
    ];
    consumer.apply(AuthMiddleware(authWhiteList)).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}

