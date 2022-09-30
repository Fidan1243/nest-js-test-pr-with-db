/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller('news')
export class NewsController{
    constructor(private NewsService: NewsService){}
    @Get()
    async getAllNews(){
        return await this.NewsService.GetNews();
    }
    @Get("/:categoryId")
    async getNewsByCategory(@Param("categoryId") category:string){
        return await this.NewsService.GetNewsByCategory(category);
    }
    @Post()
    async Add(@Body() name:string){
        return await this.NewsService.Add(name);
    }
}