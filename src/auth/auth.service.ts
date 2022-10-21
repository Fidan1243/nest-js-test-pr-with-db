/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthModel } from './auth.model';
import { TokenService } from '../token/token.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<AuthModel>,
    @Inject(TokenService) private readonly TokenService: TokenService
  ) {}

  async Add(email: string, password: string) {
    if (!email || !password) {
      throw error('null param', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCt = new this.userModel({
      email: email,
      password: hashedPassword,
    });
    const result = await newCt.save();
    console.log(result);
    return result;
  }

  async Login(email: string, password: string) {
    if (!email || !password) {
      throw error('null param', 400);
    }
    const userr = await this.userModel.findOne({ email: email });
    if (!userr) {
      throw error("user doesn't exist", 404);
    }
    const compared = await bcrypt.compare(password, userr.password);
    if (!compared) {
      throw error('invalid password', 400);
    }
    const {accessToken,refreshToken} = await this.TokenService.generateTokens(userr._id);
    return { accessToken,refreshToken };
  }

  async findUserById(_id){
    const result = await this.userModel.findById(_id);
    return result;
  }
}
