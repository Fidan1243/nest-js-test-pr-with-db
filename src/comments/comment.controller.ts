/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Cache } from "cache-manager";

@Controller('comments')
export class CommentController{
    constructor(private CommentService: CommentService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}
    @Get("news/:newsId")
    async getAllComments(@Param("newsId") newsId:string){
        const val = await this.cacheManager.get('comments'+newsId);
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.CommentService.GetComments(newsId);
        await this.cacheManager.set('comments'+newsId, result, { ttl: 1000 });
        return result;
    }
    @Get("/:commentId")
    async getCommentsById(@Param("commentId") commentId:string){
        const val = await this.cacheManager.get('comments'+commentId);
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.CommentService.GetCommentsById(commentId);
        await this.cacheManager.set('comments'+commentId, result, { ttl: 1000 });
        return result;
    }

    @Post()
    async Add(@Body() name:string){
        const result = await this.CommentService.Add(name);
        await this.cacheManager.set('comments'+result._id, result, { ttl: 1000 });
        return result;
    }
}