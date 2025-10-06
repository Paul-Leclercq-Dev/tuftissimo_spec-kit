import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, Order, CustomOrder } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateCombinedOrderDto } from './dto/create-combined-order.dto';
import { calculateUnitPrice } from './pricing';
import { computeTotals } from './compute-totals';
import { CreateProductOrderDto } from './dto/create-product-order.dto';

const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async create(dto: CreateOrderDto & { userId?: number }): Promise<Order> {
    return prisma.order.create({ data: dto });
  }

  async createProductOrder(dto: CreateProductOrderDto, userId?: number): Promise<Order> {
    const product = await prisma.product.findUnique({ where: { slug: dto.productSlug } });
    if (!product) throw new BadRequestException('Product not found');
    if (product.priceCents == null) throw new BadRequestException('Product has no base price');
    if (product.stock !== undefined && product.stock !== null && product.stock < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // Calcul du prix unitaire HT avec options
    const unitPriceCents = calculateUnitPrice(
      product.priceCents,
      dto.material,
      dto.size,
      dto.backing
    );

    const totals = computeTotals(unitPriceCents, dto.quantity, dto.country);

    const order = await prisma.$transaction(async (tx) => {
      if (typeof product.stock === 'number') {
        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - dto.quantity },
        });
      }

      return tx.order.create({
        data: {
          kind: 'PRODUCT',
          status: 'pending',
          productId: product.id,
          material: dto.material,
          size: dto.size,
          backing: dto.backing,
          quantity: dto.quantity,
          lineLabel: `${product.name} — ${dto.material}/${dto.size}/${dto.backing}`,
          priceCents: totals.subtotalCents,
          taxCents: totals.taxCents,
          shippingCents: totals.shippingCents,
          totalCents: totals.totalCents,
          currency: 'EUR',
          email: dto.email,
          address: dto.address ?? null,
          country: dto.country,
          userId: userId ?? null,
        },
      });
    });

    return order;
  }

  async createWithCustom(
    dto: CreateCombinedOrderDto,
  ): Promise<{ order: Order; customOrder: CustomOrder }> {
    return prisma.$transaction(async (tx) => {
      const customOrder = await tx.customOrder.create({
        data: { ...dto.customOrder, colors: dto.customOrder.colors ? JSON.stringify(dto.customOrder.colors) : null },
      });

      const orderData: any = {
        ...dto.order,
        customOrderId: customOrder.id,
        kind: 'CUSTOM',
        productId: null,
        quantity: 1,
        lineLabel: dto.order.lineLabel ?? 'Commande artisanale',
      };

      const order = await tx.order.create({ data: orderData });

      return { order, customOrder };
    });
  }

  async findAll(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        product: true,
        customOrder: true,
      },
    }); 
  }

  async findByUser(userId: number): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: {
        product: true,
        customOrder: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        customOrder: true,
      },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto & { userId?: number }): Promise<Order> {
    await this.findOne(id);
    return prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<Order> {
    const order = await this.findOne(id);
    return prisma.order.delete({ where: { id } });
  }
}