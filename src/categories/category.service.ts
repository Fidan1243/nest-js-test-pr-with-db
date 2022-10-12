/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryModel } from "./category.model";

@Injectable()
export class CategoryService{

    constructor(@InjectModel('Categories') private readonly categoryModel: Model<CategoryModel>){}

    async GetCategories(){
        const result = await this.categoryModel.find();
        console.log(result);
        return result;
    }

    
    async GetCategoryById(st:string){
        console.log(st);
         const result = await this.categoryModel.find({_id:st});
         console.log(result);
         return result;
    }

    async Add(name:string){
        const newCt = new this.categoryModel(name);
        const result = await newCt.save();
        console.log(result);
        return result;
    }

}