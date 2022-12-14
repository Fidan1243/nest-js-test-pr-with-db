/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from './user.service';

@Module({
    imports:[  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [UserController],
    providers: [UserService]
})
export class UsersModule {}
