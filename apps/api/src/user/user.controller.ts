import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Res, UnauthorizedException, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: any;
}


@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: "Créer un nouvel utilisateur" }) 
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Utilisateur créé" })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  @ApiOperation({ summary: "Connexion utilisateur et récupération JWT" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: "Connexion réussie" })
  @ApiResponse({ status: 401, description: "Identifiants invalides" })
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.login(dto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 12,
    });
    return { message: 'Logged in' };
  }

  @Post('logout')
  @ApiOperation({ summary: "Déconnexion utilisateur" })
  @ApiResponse({ status: 200, description: "Utilisateur déconnecté" })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: "Profil utilisateur connecté" })
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Lister tous les utilisateurs" })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "Récupérer un utilisateur par ID" })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: "Mettre à jour un utilisateur" })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Supprimer un utilisateur" })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}