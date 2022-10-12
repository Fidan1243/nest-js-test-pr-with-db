/* eslint-disable prettier/prettier */
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentSchema } from './comment.model';
import { CommentService } from './comment.service';
import redisStore from 'cache-manager-redis-store';
@Module({
    imports:[MongooseModule.forFeature([{name:"Comments",schema:CommentSchema}]),  CacheModule.register({
        store:redisStore,
        host:"localhost",
        port:process.env.REDIS_PORT
      })],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}
