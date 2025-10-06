import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsArray, IsInt } from 'class-validator';

export class CreateCustomOrderDto {
  @ApiPropertyOptional({ example: 120.5, description: 'Largeur (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @ApiPropertyOptional({ example: 80, description: 'Hauteur (cm)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ example: ['bleu', 'blanc', 'gris'], description: 'Couleurs souhaitées' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', description: 'URL image inspiration' })
  @IsOptional()
  @IsString()
  inspirationUrl?: string;

  @ApiPropertyOptional({ example: 'Texte supplémentaire/notes', description: 'Remarques diverses' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID de la commande liée (nullable)' })
  @IsOptional()
  @IsInt()
  orderId?: number;
}
