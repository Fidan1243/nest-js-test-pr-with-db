/* eslint-disable prettier/prettier */
import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.model';
import { AuthService } from './auth.service';
import redisStore from 'cache-manager-redis-store';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
@Module({
    imports:[forwardRef(()=>TokenModule), MongooseModule.forFeature([{name:"Users",schema:AuthSchema}]),  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [AuthController],
    providers: [AuthService, TokenService],
    exports: [AuthService,AuthModule]
  })
export class AuthModule {}
