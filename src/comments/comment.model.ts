/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  username: {type:String,required:true},
  news : {type:Schema.Types.ObjectId,ref:"news",required:true},
  comment:{type:String,required:true}
})

export interface CommentModel {
  id: number;
  username: string;
  news:string;
  comment:string;
}