import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async create(dto: CreateOrderDto): Promise<Order> {
    return prisma.order.create({ data: dto });
  }

  async findAll(): Promise<Order[]> {
    return prisma.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);
    return prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<Order> {
    const order = await this.findOne(id);
    return prisma.order.delete({ where: { id } });
  }
}
