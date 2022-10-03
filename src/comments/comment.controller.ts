/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";

@Controller('comments')
export class CommentController{
    constructor(private CommentService: CommentService){}
    @Get("news/:newsId")
    getAllComments(@Param("newsId") newsId:string){
        return this.CommentService.GetComments(newsId);
    }
    @Get("/:commentId")
    getCommentsById(@Param("commentId") commentId:string){
        return this.CommentService.GetCommentsById(commentId);
    }

    @Post()
    Add(@Body() name:string){
        //console.log(name);
        return this.CommentService.Add(name);
    }
}