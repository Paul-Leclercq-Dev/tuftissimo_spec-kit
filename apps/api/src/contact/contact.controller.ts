import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('contacts')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: "Créer un nouveau contact" })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: "Contact créé" })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Lister tous les contacts" })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupérer un contact par ID" })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Mettre à jour un contact" })
  @ApiBody({ type: UpdateContactDto })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer un contact" })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}