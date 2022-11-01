/* eslint-disable prettier/prettier */
import { Body, CACHE_MANAGER, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Post('signup')
  async Add(@Body('email') email: string, @Body('password') password: string) {
    try {
      const result = this.AuthService.Add(email, password);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Post('login')
  async Login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const result = this.AuthService.Login(email, password);
      return result;
    } catch (error) {
      return error;
    }
  }

}
