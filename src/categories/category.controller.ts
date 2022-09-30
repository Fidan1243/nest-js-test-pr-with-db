/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryModel } from "./category.model";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController{
    constructor(private CategoryService: CategoryService){}
    @Get()
    getAllNews(){
        return this.CategoryService.GetCategories();
    }
    @Post()
    Add(@Body() name:string){
        return this.CategoryService.Add(name);
    }
}