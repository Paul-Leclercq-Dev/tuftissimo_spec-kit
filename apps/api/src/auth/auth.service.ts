import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tuftissimo.com';
const ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH || '';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateAdmin(email: string, password: string): Promise<boolean> {
    if (email !== ADMIN_EMAIL) return false;
    if (!ADMIN_HASH) return false;
    return bcrypt.compare(password, ADMIN_HASH);
  }

  async login(dto: LoginDto): Promise<string | null> {
    const valid = await this.validateAdmin(dto.email, dto.password);
    if (!valid) return null;
    const payload = { email: ADMIN_EMAIL, role: 'admin' };
    return this.jwtService.sign(payload);
  }
} 
