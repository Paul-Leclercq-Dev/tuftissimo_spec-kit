import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Alice Dupont', description: 'Nom complet du contact' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'alice@example.com', description: 'Adresse email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Question sur les tapis personnalisés', description: 'Sujet du message' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: "Je souhaite plus d'infos.", description: 'Message texte soumis' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'ID utilisateur si connecté', example: 1 })
  @IsOptional()
  userId?: number;
}

