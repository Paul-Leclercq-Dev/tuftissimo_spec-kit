// Types pour l'authentification
export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
}

// Types pour les produits
export interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number; // en centimes
  material: 'laine' | 'coton' | 'acrylique';
  size: 'small' | 'medium' | 'large';
  backing: 'standard' | 'antislip' | 'premium';
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  basePrice: number;
  material: 'laine' | 'coton' | 'acrylique';
  size: 'small' | 'medium' | 'large';
  backing: 'standard' | 'antislip' | 'premium';
  stock: number;
  imageUrl?: string;
}

// Types pour les commandes
export interface Order {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  subtotal: number; // en centimes
  shippingCost: number; // en centimes
  vatAmount: number; // en centimes
  total: number; // en centimes
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  userId?: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number; // en centimes
  product: Product;
}

export interface CreateOrderDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
}

export interface CreateProductOrderDto {
  productId: number;
  quantity: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
}

// Types pour les commandes personnalisées
export interface CustomOrder {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  size: 'small' | 'medium' | 'large' | 'custom';
  customDimensions?: string;
  material?: 'laine' | 'coton' | 'acrylique';
  budget?: string;
  description: string;
  attachments?: string[];
  status: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  estimatedPrice?: number; // en centimes
  userId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomOrderDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  size: 'small' | 'medium' | 'large' | 'custom';
  customDimensions?: string;
  material?: 'laine' | 'coton' | 'acrylique';
  budget?: string;
  description: string;
  attachments?: string[];
}

// Types pour les contacts
export interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'resolved';
  userId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  subject: string;
  message: string;
}

// Types pour le panier local
export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// Types pour les filtres de produits
export interface ProductFilters {
  material?: 'laine' | 'coton' | 'acrylique';
  size?: 'small' | 'medium' | 'large';
  backing?: 'standard' | 'antislip' | 'premium';
  maxPrice?: number;
  search?: string;
}

// Types pour la pagination
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Types pour les réponses d'erreur
export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  validation?: ValidationError[];
}