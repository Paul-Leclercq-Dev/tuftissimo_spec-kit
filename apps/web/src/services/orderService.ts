import { api } from '@/lib/api';

export interface Order {
  id: number;
  kind: 'PRODUCT' | 'CUSTOM';
  status: 'pending' | 'paid' | 'failed' | 'preparing' | 'shipped' | 'cancelled';
  productId?: number;
  material?: 'COTTON_A' | 'COTTON_B' | 'WOOL_A';
  size?: 'S' | 'M' | 'L';
  backing?: 'ADHESIVE' | 'NON_ADHESIVE';
  customOrderId?: number;
  lineLabel: string;
  quantity: number;
  priceCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  email: string;
  address?: string;
  country?: string;
  userId?: number;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductOrderData {
  productSlug: string;
  quantity: number;
  material?: 'COTTON_A' | 'COTTON_B' | 'WOOL_A';
  size?: 'S' | 'M' | 'L';
  backing?: 'ADHESIVE' | 'NON_ADHESIVE';
  email: string;
  address?: string;
  country: 'ES' | 'FR';
}

export interface OrderTotals {
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  vatRatePercent: number;
}

export class OrderService {
  /**
   * Créer une commande produit avec calculs automatiques
   */
  static async createProductOrder(orderData: CreateProductOrderData): Promise<Order> {
    try {
      const response = await api.post('/orders/product', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating product order:', error);
      throw new Error('Failed to create order');
    }
  }

  /**
   * Récupérer toutes les commandes (admin)
   */
  static async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  /**
   * Récupérer une commande par ID
   */
  static async getOrder(id: number): Promise<Order> {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  /**
   * Formater le prix en euros
   */
  static formatPrice(priceCents: number): string {
    return `${(priceCents / 100).toFixed(2)} €`;
  }

  /**
   * Traduire le statut en français
   */
  static translateStatus(status: string): string {
    const translations: Record<string, string> = {
      'pending': 'En attente',
      'paid': 'Payé',
      'failed': 'Échec',
      'preparing': 'En préparation',
      'shipped': 'Expédié',
      'cancelled': 'Annulé'
    };
    return translations[status] || status;
  }

  /**
   * Traduire le matériau en français
   */
  static translateMaterial(material?: string): string {
    const translations: Record<string, string> = {
      'COTTON_A': 'Coton Standard',
      'COTTON_B': 'Coton Premium',
      'WOOL_A': 'Laine'
    };
    return material ? translations[material] || material : 'Non spécifié';
  }

  /**
   * Traduire la taille en français
   */
  static translateSize(size?: string): string {
    const translations: Record<string, string> = {
      'S': 'Petit',
      'M': 'Moyen',
      'L': 'Grand'
    };
    return size ? translations[size] || size : 'Non spécifié';
  }

  /**
   * Traduire le support en français
   */
  static translateBacking(backing?: string): string {
    const translations: Record<string, string> = {
      'ADHESIVE': 'Adhésif',
      'NON_ADHESIVE': 'Non adhésif'
    };
    return backing ? translations[backing] || backing : 'Non spécifié';
  }
}
