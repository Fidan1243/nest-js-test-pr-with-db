/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategorySchema } from './category.model';
import { CategoryService } from './category.service';
import redisStore from 'cache-manager-redis-store';
@Module({
    imports:[MongooseModule.forFeature([{name:"Categories",schema:CategorySchema}]),  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
