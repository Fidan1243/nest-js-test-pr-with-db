/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const CategorySchema = new Schema({
  name : {type:String,required:true}
})

export interface CategoryModel {
  id: number;
  name: string;
}