import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
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
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { access_token: token };
  }
}
