/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewsModel } from "./news.model";

@Injectable()
export class NewsService{

    constructor(@InjectModel('News') private readonly newsModel: Model<NewsModel>){}

    async GetNews(){
        const result = await this.newsModel.find();
        console.log(result);
        return result;
    }
    
    async GetNewsByCategory(category:object){
        console.log(category);
        const result = await this.newsModel.find(category);
        console.log(result);
        return result;
    }

    async Add(obj:string){
        const NewS = new this.newsModel(obj);
        const result = await NewS.save();
        console.log(result);
        return HttpStatus.OK;
    }

}