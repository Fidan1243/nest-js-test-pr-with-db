import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jsonwebtoken from 'jsonwebtoken';
import { Model } from 'mongoose';
import { TokenModel } from './token.model';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<TokenModel>,
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
}
