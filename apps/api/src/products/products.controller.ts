import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un produit' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Produit créé avec succès.' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  @ApiResponse({ status: 200, description: 'Liste des produits' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par ID' })
  @ApiResponse({ status: 200, description: 'Produit trouvé' })
  @ApiResponse({ status: 404, description: 'Produit non trouvé' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un produit' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Produit mis à jour' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un produit' })
  @ApiResponse({ status: 200, description: 'Produit supprimé' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}