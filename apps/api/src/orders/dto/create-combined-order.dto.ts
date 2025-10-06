import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';
import { CreateCustomOrderDto } from '../../custom-order/dto/create-custom-order.dto';

export class CreateCombinedOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateOrderDto)
  order: CreateOrderDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateCustomOrderDto)
  customOrder: CreateCustomOrderDto;
} 