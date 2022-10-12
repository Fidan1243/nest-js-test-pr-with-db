/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Inject, CACHE_MANAGER  } from "@nestjs/common";
import { NewsService } from "./news.service";
import {Cache} from 'cache-manager';

@Controller('news')
export class NewsController{
    constructor(private NewsService: NewsService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}
    @Get()
    async getAllNews(){
        const val = await this.cacheManager.get('news');
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.NewsService.GetNews();
        await this.cacheManager.set('news', result, { ttl: 1000 });
        return result;
    }
    @Get("/:categoryId")
    async getNewsByCategory(@Param("categoryId") category:string){
        const val = await this.cacheManager.get(category);
        if(val){
            console.log("from redis" + val);
            return val;
        }
        const result = await this.NewsService.GetNewsByCategory(category);
        await this.cacheManager.set(category, result, { ttl: 1000 });
        return result;    
    }
    @Post()
    async Add(@Body() name:string){
        const result = await this.NewsService.Add(name);
        await this.cacheManager.set(result._id.toString(), result, { ttl: 1000 });
        return result;
    }
}