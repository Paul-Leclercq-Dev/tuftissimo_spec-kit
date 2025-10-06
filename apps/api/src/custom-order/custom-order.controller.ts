import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CustomOrderService } from './custom-order.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('custom-orders')
@Controller('custom-order')
@UseGuards(JwtAuthGuard)
export class CustomOrderController {
  constructor(private readonly service: CustomOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande sur mesure' })
  @ApiBody({ type: CreateCustomOrderDto })
  @ApiResponse({ status: 201, description: 'Commande sur mesure créée' })
  create(@Body() dto: CreateCustomOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les commandes sur mesure' })
  @ApiResponse({ status: 200, description: 'Liste des commandes sur mesure' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande sur mesure par ID' })
  @ApiResponse({ status: 200, description: 'Commande sur mesure retournée' })
  @ApiResponse({ status: 404, description: 'Commande sur mesure non trouvée' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande sur mesure' })
  @ApiBody({ type: UpdateCustomOrderDto })
  @ApiResponse({ status: 200, description: 'Commande sur mesure mise à jour' })
  update(@Param('id') id: string, @Body() dto: UpdateCustomOrderDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande sur mesure' })
  @ApiResponse({ status: 200, description: 'Commande sur mesure supprimée' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}