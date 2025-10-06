import { api } from '@/lib/api';

interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
}

export class OrderService {
  static async createOrder(orderData: any): Promise<Order> {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  static async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }
}
