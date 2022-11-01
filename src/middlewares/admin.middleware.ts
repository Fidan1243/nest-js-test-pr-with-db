import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.user) {
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
