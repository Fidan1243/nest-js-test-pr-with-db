/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController{
    constructor(private CategoryService: CategoryService){}
    @Get()
    getAllCategories(){
        return this.CategoryService.GetCategories();
    }

    @Get("/:categoryId")
    getCategoryById(@Param("categoryId") categoryId:string){
        return this.CategoryService.GetCategoryById(categoryId);
    }

    @Post()
    Add(@Body() name:string){
        return this.CategoryService.Add(name);
    }
}