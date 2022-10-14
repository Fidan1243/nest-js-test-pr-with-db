/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Cache } from "cache-manager";

@Controller('categories')
export class CategoryController{
    constructor(private CategoryService: CategoryService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}
    @Get()
    async getAllCategories(){
        const val = await this.cacheManager.get('categories');
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.CategoryService.GetCategories();
        await this.cacheManager.set('categories', result, { ttl: 1000 });
        return result;
    }

    @Get("/:categoryId")
    async getCategoryById(@Param("categoryId") categoryId:string){
        const val = await this.cacheManager.get('category'+categoryId);
        if(val){
            console.log("from redis " + val);
            return val;
        }
        const result = await this.CategoryService.GetCategoryById(categoryId);
        await this.cacheManager.set('category'+categoryId, result, { ttl: 1000 });
        return result;
    }

    @Post()
    async Add(@Body() name:string){
        const result = await this.CategoryService.Add(name);
        return result;
    }
}