import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async create(dto: CreateProductDto): Promise<Product> {
    return prisma.product.create({ data: dto });
  }

  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    return prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return prisma.product.delete({ where: { id } });
  }
}