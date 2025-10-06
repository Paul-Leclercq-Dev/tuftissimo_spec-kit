import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEmail, IsEnum } from 'class-validator';
import { OrderKind, OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ enum: OrderKind, example: OrderKind.PRODUCT })
  @IsEnum(OrderKind)
  kind!: OrderKind;

  @ApiPropertyOptional({ enum: OrderStatus, example: OrderStatus.pending })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty()
  @IsString()
  lineLabel!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty()
  @IsInt()
  priceCents!: number;

  @ApiPropertyOptional()
  @IsInt()
  taxCents?: number;

  @ApiPropertyOptional()
  @IsInt()
  shippingCents?: number;

  @ApiProperty()
  @IsInt()
  totalCents!: number;

  @ApiPropertyOptional({ default: 'EUR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsString()
  address?: string | null;

  @ApiPropertyOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional()
  @IsInt()
  productId?: number | null;

  @ApiPropertyOptional()
  @IsInt()
  customOrderId?: number | null;

  @ApiPropertyOptional()
  @IsString()
  stripeSessionId?: string | null;

  @ApiPropertyOptional()
  @IsString()
  stripePaymentIntentId?: string | null;
}
