import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('admin-auth')
@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: "Connexion admin et récupération JWT" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Connexion réussie avec JWT retourné" })
  @ApiResponse({ status: 401, description: "Identifiants invalides" })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    
    // Stocker le token dans un cookie HttpOnly
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000, // 12 heures
    });
    
    return { access_token: token, message: 'Login successful' };
  }
}
