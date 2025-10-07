import { api } from '@/lib/api';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  priceCents: number;
  stock: number;
  slug?: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  priceCents?: number;
  stock?: number;
  slug?: string;
}

export class AdminProductService {
  /**
   * Récupérer tous les produits (admin)
   */
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Récupérer un produit par ID
   */
  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Créer un nouveau produit (authentifié)
   */
  static async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  /**
   * Mettre à jour un produit (authentifié)
   */
  static async updateProduct(id: number, productData: UpdateProductData): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  /**
   * Supprimer un produit (authentifié)
   */
  static async deleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  /**
   * Générer un slug automatiquement à partir du nom
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Garder uniquement lettres, chiffres, espaces et tirets
      .trim()
      .replace(/\s+/g, '-') // Remplacer espaces par tirets
      .replace(/-+/g, '-'); // Supprimer tirets multiples
  }

  /**
   * Formater le prix en euros
   */
  static formatPrice(priceCents: number): string {
    return `${(priceCents / 100).toFixed(2)} €`;
  }

  /**
   * Convertir euros en centimes
   */
  static eurosToCents(euros: number): number {
    return Math.round(euros * 100);
  }
}