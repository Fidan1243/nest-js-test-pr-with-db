/* eslint-disable prettier/prettier */
import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthSchema } from '../models/auth.model';
import { AuthService } from './auth.service';
import redisStore from 'cache-manager-redis-store';
import { TokenModule } from '../token/token.module';
@Module({
    imports:[forwardRef(()=>TokenModule),  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [AuthController],
    providers: [AuthService]
  })
export class AuthModule {}
