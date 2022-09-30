/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './categories/category.module';
@Module({
  imports: [NewsModule, CategoryModule, MongooseModule.forRoot(
    'mongodb+srv://user123:29U2EV66a@cluster0.wpezv.mongodb.net/NEST-JS?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {}
