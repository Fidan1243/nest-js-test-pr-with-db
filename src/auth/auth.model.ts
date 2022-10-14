/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const AuthSchema = new Schema({
  email : {type:String,required:true},
  password : {type:String,required:true}
})

export interface AuthModel {
  id: number;
  email: string;
  password: string;
}