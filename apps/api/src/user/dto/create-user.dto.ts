import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: "L'email de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: "Le mot de passe (min 6 caractères)" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Alice Dupont', description: "Le nom complet de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  name: string;
}