/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './role.controller';
import { NewsSchema } from './role.model';
import * as redisStore from 'cache-manager-redis-store';
import { NewsService } from './role.service';

@Module({
    imports:[MongooseModule.forFeature([{name:"News",schema:NewsSchema}]),  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [NewsController],
    providers: [NewsService]
})
export class NewsModule {}
