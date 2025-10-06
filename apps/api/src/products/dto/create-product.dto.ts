import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'tapis-unique-001', description: 'Slug unique du produit' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Tapis Unique 001', description: 'Nom du produit' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 5999, description: 'Prix en centimes' })
  @IsInt()
  @Min(0)
  priceCents: number;

  @ApiProperty({ example: 15, description: 'Stock disponible' })
  @IsInt()
  @Min(0)
  stock: number;
}
