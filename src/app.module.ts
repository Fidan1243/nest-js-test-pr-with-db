/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {config} from 'dotenv';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category.module';
import { CommentModule } from './comments/comment.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
config();
@Module({
  imports: [NewsModule, CategoryModule, TokenModule, CommentModule, AuthModule, MongooseModule.forRoot(
    process.env.MONGO_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
