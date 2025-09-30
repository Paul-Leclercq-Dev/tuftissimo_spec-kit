import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return { admin: req.user };
  }
}
