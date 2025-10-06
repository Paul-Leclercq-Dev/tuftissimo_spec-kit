import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
}
