'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/services/productService';
import { OrderService, CreateProductOrderData } from '@/services/orderService';

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderFormData {
  quantity: number;
  material: 'COTTON_A' | 'COTTON_B' | 'WOOL_A';
  size: 'S' | 'M' | 'L';
  backing: 'ADHESIVE' | 'NON_ADHESIVE';
  email: string;
  address: string;
  country: 'ES' | 'FR';
}

export default function OrderProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<OrderFormData>({
    quantity: 1,
    material: 'COTTON_A',
    size: 'M',
    backing: 'ADHESIVE',
    email: '',
    address: '',
    country: 'FR'
  });

  const router = useRouter();

  useEffect(() => {
    loadProduct();
  }, [params.slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await ProductService.getProducts();
      const foundProduct = products.find(p => p.slug === params.slug);
      
      if (!foundProduct) {
        setError('Produit non trouvé');
        return;
      }
      
      setProduct(foundProduct);
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const calculateEstimatedTotal = () => {
    if (!product) return { total: 0, breakdown: null };

    // Estimation côté client (le calcul exact se fait côté serveur)
    let unitPrice = product.priceCents;
    
    // Ajustements approximatifs pour les options
    if (formData.material === 'COTTON_B') unitPrice += 500; // +5€
    if (formData.material === 'WOOL_A') unitPrice += 1500; // +15€
    if (formData.size === 'L') unitPrice += 1000; // +10€
    if (formData.backing === 'NON_ADHESIVE') unitPrice += 300; // +3€

    const subtotal = unitPrice * formData.quantity;
    const tax = Math.round(subtotal * 0.21); // TVA 21%
    const shipping = formData.country === 'ES' ? 500 : 1000; // 5€ ES, 10€ FR
    const total = subtotal + tax + shipping;

    return {
      total,
      breakdown: {
        subtotal,
        tax,
        shipping,
        unitPrice
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    setOrdering(true);
    setError(null);

    try {
      const orderData: CreateProductOrderData = {
        productSlug: product.slug,
        quantity: formData.quantity,
        material: formData.material,
        size: formData.size,
        backing: formData.backing,
        email: formData.email,
        address: formData.address,
        country: formData.country
      };

      const order = await OrderService.createProductOrder(orderData);
      setOrderId(order.id);
      setOrderSuccess(true);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Erreur lors de la création de la commande. Veuillez réessayer.');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <Button onClick={() => router.push('/products')} className="mt-4">
              Retour aux produits
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess && orderId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Commande confirmée !</h1>
          <p className="text-green-700 mb-4">
            Votre commande #{orderId} a été créée avec succès.
          </p>
          <p className="text-sm text-green-600 mb-6">
            Vous recevrez un email de confirmation à l'adresse {formData.email}
          </p>
          <div className="space-x-4">
            <Button onClick={() => router.push('/products')}>
              Continuer mes achats
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { total, breakdown } = calculateEstimatedTotal();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.push('/products')}>
          ← Retour aux produits
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Informations produit */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product?.name}</h1>
            <p className="text-slate-600">{product?.description || 'Aucune description disponible'}</p>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <span className="text-slate-500">No image available</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Prix de base:</span>
              <span className="font-medium">{OrderService.formatPrice(product?.priceCents || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Stock:</span>
              <span className="font-medium">{product?.stock || 0} disponible(s)</span>
            </div>
          </div>
        </div>

        {/* Formulaire de commande */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Personnaliser votre commande</h2>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quantité */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantité
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
                min="1"
                max={product?.stock || 1}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Matériau */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Matériau
              </label>
              <select
                name="material"
                value={formData.material}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="COTTON_A">Coton Standard</option>
                <option value="COTTON_B">Coton Premium (+5€)</option>
                <option value="WOOL_A">Laine (+15€)</option>
              </select>
            </div>

            {/* Taille */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Taille
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="S">Petit (S)</option>
                <option value="M">Moyen (M)</option>
                <option value="L">Grand (L) (+10€)</option>
              </select>
            </div>

            {/* Support */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type de support
              </label>
              <select
                name="backing"
                value={formData.backing}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ADHESIVE">Adhésif</option>
                <option value="NON_ADHESIVE">Non adhésif (+3€)</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Adresse de livraison
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre adresse complète..."
              />
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pays de livraison
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleFormChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FR">France (10€ de port)</option>
                <option value="ES">Espagne (5€ de port)</option>
              </select>
            </div>

            {/* Récapitulatif prix */}
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total HT:</span>
                <span>{OrderService.formatPrice(breakdown?.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>TVA (21%):</span>
                <span>{OrderService.formatPrice(breakdown?.tax || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frais de port:</span>
                <span>{OrderService.formatPrice(breakdown?.shipping || 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total TTC:</span>
                <span>{OrderService.formatPrice(total)}</span>
              </div>
            </div>

            {/* Bouton de commande */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={ordering || (product?.stock || 0) < formData.quantity}
            >
              {ordering ? 'Création en cours...' : `Commander - ${OrderService.formatPrice(total)}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}