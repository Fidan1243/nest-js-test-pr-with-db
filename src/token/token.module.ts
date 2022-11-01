/* eslint-disable prettier/prettier */
import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AuthSchema } from '../models/auth.model';
import { AuthModule } from '../auth/auth.module';
import { TokenSchema } from './token.model';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: AuthSchema }]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: process.env.REDIS_PORT,
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
