import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.user) {
        return next();
      }
      const token = req.headers['refreshToken'].toString();
      if (token) {
        const rtoken = token.split(' ')[1];
        if (rtoken) {
          const userData = await this.tokenService.validateRefreshToken(rtoken);
          req.body.user = userData;
          return next();
        }
      }
      return next(new Error("You're not logged in!"));
    } catch (error) {
      return next(new Error("You're not logged in!"));
    }
  }
}
