/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const RoleSchema = new Schema({
  role : {type:String,required:true},
})

export interface RoleModel {
  id: number;
  role: string;
}