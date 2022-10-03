/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentSchema } from './comment.model';
import { CommentService } from './comment.service';

@Module({
    imports:[MongooseModule.forFeature([{name:"Comments",schema:CommentSchema}])],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}
