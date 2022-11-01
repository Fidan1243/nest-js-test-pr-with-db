/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly authModel: Model<AuthModel>) {}

  async GetUsers() {
    const result = await this.authModel.find();
    console.log(result);
    return result;
  }

  async UpdateUser(userId: string,payload:object) {
    const result = await this.authModel.updateOne({ _id:userId },payload);
    console.log(result);
    return result;
  }
  
  async DeleteUser(userId: string) {
    const result = await this.authModel.deleteOne({ _id: userId });
    console.log(result);
    return result;
  }
  
  async GetUserById(id: string) {
    const result = await this.authModel.findById({ id });
    console.log(result);
    return result;
  }

  async GetUserByRole(role: string) {
    const result = await this.authModel.findOne({ role:role });
    console.log(result);
    return result;
  }

  async Add(obj: string) {
    const NewS = new this.authModel(obj);
    const result = await NewS.save();
    console.log(result);
    return result;
  }
}
