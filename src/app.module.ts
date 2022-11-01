/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { config } from 'dotenv';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category.module';
import { CommentModule } from './comments/comment.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RefreshMiddleware } from './middlewares/refresh.middleware';
config();
@Module({
  imports: [
    NewsModule,
    CategoryModule,
    TokenModule,
    CommentModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, RefreshMiddleware)
      .forRoutes(
        { path: 'news', method: RequestMethod.POST },
        { path: 'categories', method: RequestMethod.POST },
        { path: 'users', method:RequestMethod.ALL },
      );
  }
}
