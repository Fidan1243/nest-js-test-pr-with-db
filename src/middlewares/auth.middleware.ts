import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.accesstoken) {
        const accessTokeen = req.headers['accesstoken'].toString();
        const token = accessTokeen.split(' ')[1];
        console.log(token);
        if (token) {
          const userData = await this.tokenService.validateAccessToken(token);
          req.body.user = userData;
        }
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
