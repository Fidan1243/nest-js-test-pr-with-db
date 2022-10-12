/* eslint-disable prettier/prettier */
import { Module, CacheModule } from '@nestjs/common';
import {config} from 'dotenv';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category.module';
import { CommentModule } from './comments/comment.module';
config();
@Module({
  imports: [NewsModule, CategoryModule, CommentModule, MongooseModule.forRoot(
    process.env.MONGO_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
