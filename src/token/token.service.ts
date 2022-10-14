import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import { TokenModel } from './token.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject(AuthService)
    private service: AuthService,
    @InjectModel('Token') private readonly tokenModel: Model<TokenModel>,
  ) {}
  public async generateTokens(payload: JwtPayload) {
    if (!payload) {
      throw new Error('Payload is empty!');
    }
    try {
      const accessToken = jwt.sign({ payload }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(
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

  public async validateAccessToken(accessToken: string) {
    if (!accessToken) {
      throw new HttpException('Unauthorized', 401);
    }
    try {
      const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      if (userData) {
        const result = await this.service.findUserById(userData);
        if (result) {
          return userData;
        } else {
          throw new HttpException("User doesn't exist", 404);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  public async saveToken(userId: Types.ObjectId, refreshToken: string) {
    if (!userId || !refreshToken) {
      throw new Error('null');
    }
    try {
      const tokenData = await this.tokenModel.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }
      const token = new this.tokenModel({ user: userId, refreshToken });
      const result = await token.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
  public async removeToken(userId: string) {
    if (!userId) {
      throw new Error('null');
    }
    try {
      const removed = await this.tokenModel.deleteOne({ user: userId });
      return removed;
    } catch (err) {
      throw err;
    }
  }

  public async validateRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException("You're not logged in!", 401);
    }
    try {
      const result = await this.tokenModel.find({ refreshToken });
      if (!result.length) throw new HttpException('Unauthorized', 401);
      else {
        const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}
