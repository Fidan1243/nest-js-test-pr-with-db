import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jsonwebtoken from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import { AuthModel } from '../models/auth.model';
import { TokenModel } from './token.model';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<TokenModel>,
    @InjectModel('Users') private readonly userModel: Model<AuthModel>,
  ) {}
  public async generateTokens(payload: jsonwebtoken.JwtPayload) {
    if (!payload) {
      throw new Error('Payload is empty!');
    }
    try {
      const accessToken = jsonwebtoken.sign(
        { payload },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      const refreshToken = jsonwebtoken.sign(
        { payload },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
  public async saveToken(token: string, userId: Types.ObjectId) {
    if (!token || !userId) {
      throw new Error('Payload is empty!');
    }
    try {
      const tokenData = await this.tokenModel.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = token;
        return tokenData.save();
      }
      const newtoken = await this.tokenModel.create({
        user: userId,
        refreshToken: token,
      });
      return newtoken;
    } catch (error) {
      throw error;
    }
  }
  public async validateAccessToken(accessToken: string) {
    if (!accessToken) {
      throw new Error('Unauthorized');
    }
    try {
      const userData = await jsonwebtoken.verify(
        accessToken,
        process.env.ACCESS_SECRET_KEY,
      );
      return userData;
    } catch (error) {
      throw error;
    }
  }
  public async validateRefreshToken(Token: string) {
    if (!Token) {
      throw new Error("You're not logged in!");
    }
    try {
      const token = await this.tokenModel.findOne({ refreshToken: Token });
      if (!token) {
        throw new Error('Invalid Refresh Token');
      }
      const userPayload = await jsonwebtoken.verify(
        Token,
        process.env.REFRESH_SECRET_KEY,
      );
      console.log(userPayload);
      return userPayload;
    } catch (error) {
      throw error;
    }
  }
}
