/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category.module';
import { CommentModule } from './comments/comment.module';
@Module({
  imports: [NewsModule, CategoryModule, CommentModule, MongooseModule.forRoot(
    'mongodb+srv://user123:22LsjhS1y0GihlgY@cluster0.wpezv.mongodb.net/NEST-JS?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {}
