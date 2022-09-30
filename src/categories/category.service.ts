/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryModel } from "./category.model";

@Injectable()
export class CategoryService{
    private allCategories:CategoryModel[] = [];

    constructor(@InjectModel('Categories') private readonly categoryModel: Model<CategoryModel>){}

    GetCategories(){
        return this.allCategories;
    }

    async Add(name:string){
        const newCt = new this.categoryModel(name);
        const result = await newCt.save();
        console.log(result);
        return HttpStatus.OK;
    }

}