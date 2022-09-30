/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const NewsSchema = new Schema({
  title : {type:String,required:true},
  text : {type:String,required:true},
  categoryId : {type:Schema.Types.ObjectId,ref:"category",required:true},
});

export interface NewsModel {
  id: number;
  title: string;
  text: string;
  categoryId: number;
}