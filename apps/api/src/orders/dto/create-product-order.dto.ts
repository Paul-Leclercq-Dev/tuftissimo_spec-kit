// apps/api/src/orders/dto/create-product-order.dto.ts
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, IsIn } from 'class-validator';
import { MaterialCode, SizeCode, BackingType } from '@prisma/client';

export class CreateProductOrderDto {
  @IsEnum(MaterialCode)
  material!: MaterialCode;

  @IsEnum(SizeCode)
  size!: SizeCode;

  @IsEnum(BackingType)
  backing!: BackingType;

  @IsString()
  @IsNotEmpty()
  productSlug!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsIn(['ES', 'FR'])
  country!: 'ES' | 'FR';

  @IsInt()
  @Min(1)
  quantity!: number;
}
