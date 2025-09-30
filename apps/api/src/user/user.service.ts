import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    // Par défaut role 'user'
    return prisma.user.create({ data: { ...dto, password: hashed, role: 'user' } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    return prisma.user.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);
    return prisma.user.delete({ where: { id } });
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(dto: LoginUserDto): Promise<{ access_token: string } | null> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) return null;
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}