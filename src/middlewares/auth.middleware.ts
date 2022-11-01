import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers['accesstoken'].toString();
      if (accessToken) {
        const token = accessToken.split(' ')[1];
        console.log(token);
        if (token) {
          const userData = await this.tokenService.validateAccessToken(token);
          req.body.user = userData;
        }
      }
      return next();
    } catch (error) {
      return next(new Error("You're not logged in!"));
    }
  }
}
