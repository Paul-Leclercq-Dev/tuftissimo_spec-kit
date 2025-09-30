import { Controller, Post, Body, UnauthorizedException, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('admin/login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);
    if (!token) throw new UnauthorizedException();
    res.cookie('access_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 1000 * 60 * 60, // 1h
    });
    return { access_token: token }; // optionnel, pour Postman
  }
}

