import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  priceCents?: number;

  @ApiPropertyOptional()
  @IsOptional()
  stock?: number;
}
