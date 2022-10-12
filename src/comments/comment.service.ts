/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommentModel } from "./comment.model";

@Injectable()
export class CommentService{

    constructor(@InjectModel('Comments') private readonly commentModel: Model<CommentModel>){}

    async GetComments(id:string){
        const result = await this.commentModel.find({news:id});
        console.log(result);
        return result;
    }

    
    async GetCommentsById(st:string){
        console.log(st);
         const result = await this.commentModel.find({_id:st});
         console.log(result);
         return result;
    }

    async Add(name:string){
        const newCt = new this.commentModel(name);
        const result = await newCt.save();
        console.log(result);
        return result;
    }

}