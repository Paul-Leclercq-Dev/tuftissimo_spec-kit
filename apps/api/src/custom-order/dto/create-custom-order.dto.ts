import { IsString, IsOptional, IsNumber, Min, Max, IsArray } from 'class-validator';

export class CreateCustomOrderDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsString()
  inspirationUrl?: string; // URL upload Cloudinary ou base64

  @IsOptional()
  @IsString()
  notes?: string;
}
