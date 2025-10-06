import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, CustomOrder } from '@prisma/client';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';

const prisma = new PrismaClient();

@Injectable()
export class CustomOrderService {
  async create(dto: CreateCustomOrderDto): Promise<CustomOrder> {
    const data = {
      ...dto,
      colors: dto.colors ? JSON.stringify(dto.colors) : null,
    };
    return prisma.customOrder.create({ data });
  }

  async findAll(): Promise<CustomOrder[]> {
    return prisma.customOrder.findMany();
  }

  async findOne(id: number): Promise<CustomOrder> {
    const order = await prisma.customOrder.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`CustomOrder #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateCustomOrderDto): Promise<CustomOrder> {
    await this.findOne(id);
    const data = {
      ...dto,
      colors: (dto as any).colors ? JSON.stringify((dto as any).colors) : undefined,
    };
    return prisma.customOrder.update({ where: { id }, data });
  }

  async remove(id: number): Promise<CustomOrder> {
    const order = await this.findOne(id);
    return prisma.customOrder.delete({ where: { id } });
  }
}
