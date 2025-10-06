import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
// import { CreateCombinedOrderDto } from './dto/create-combined-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: any;
}

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('product')
  @ApiOperation({ summary: "Créer une commande produit (avec calculs automatiques)" })
  @ApiBody({ type: CreateProductOrderDto })
  @ApiResponse({ status: 201, description: "Commande produit créée avec calculs" })
  async createProduct(@Body() dto: CreateProductOrderDto, @Req() req?: AuthenticatedRequest) {
    const userId = req?.user?.sub; // Récupère l'ID user si connecté
    return this.ordersService.createProductOrder(dto, userId);
  }

  @Post()
  @ApiOperation({ summary: "Créer une commande générique" })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: "Commande créée" })
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateOrderDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;
    return this.ordersService.create({ ...dto, userId });
  }
 
  /*
  @Post('custom')
  @ApiOperation({ summary: "Créer une commande avec commande personnalisée associée" })
  @ApiBody({ type: CreateCombinedOrderDto })
  @ApiResponse({ status: 201, description: "Commande personnalisée créée" })
  createCustom(@Body() dto: CreateCombinedOrderDto) {
    return this.ordersService.createWithCustom(dto);
  }
  */

  @Get()
  @ApiOperation({ summary: "Liste des commandes" })
  @ApiQuery({ name: 'user', required: false, description: 'Filtrer par user (me = utilisateur connecté)' })
  @UseGuards(JwtAuthGuard)
  findAll(@Query('user') userFilter?: string, @Req() req?: AuthenticatedRequest) {
    if (userFilter === 'me' && req?.user?.sub) {
      return this.ordersService.findByUser(req.user.sub);
    }
    return this.ordersService.findAll();
  }
 
  @Get(':id')
  @ApiOperation({ summary: "Détails d'une commande" })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
 
  @Put(':id')
  @ApiOperation({ summary: "Mettre à jour une commande" })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une commande" })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}