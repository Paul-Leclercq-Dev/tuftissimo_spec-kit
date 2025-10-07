'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import { ProductService } from '@/services/productService';

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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('160x230');
  const [selectedMaterial, setSelectedMaterial] = useState('laine');
  const [quantity, setQuantity] = useState(1);

  const sizes = [
    { id: '120x180', name: '120 × 180 cm', price: 0 },
    { id: '160x230', name: '160 × 230 cm', price: 15000 }, // +150€
    { id: '200x290', name: '200 × 290 cm', price: 35000 }, // +350€
    { id: 'custom', name: 'Sur mesure', price: 50000 }, // +500€
  ];

  const materials = [
    { id: 'laine', name: 'Laine premium', description: 'Douce et résistante', price: 0 },
    { id: 'coton', name: 'Coton bio', description: 'Naturel et écologique', price: -5000 }, // -50€
    { id: 'soie', name: 'Soie naturelle', description: 'Luxueux et brillant', price: 25000 }, // +250€
  ];

  useEffect(() => {
    if (params.slug) {
      loadProduct(params.slug as string);
    }
  }, [params.slug]);

  const loadProduct = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getProducts();
      const foundProduct = data.find(p => p.slug === slug);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Produit non trouvé');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Impossible de charger le produit');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceCents: number) => {
    return `${(priceCents / 100).toFixed(2)}€`;
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    const basePrice = product.priceCents;
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0;
    
    return basePrice + sizePrice + materialPrice;
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tuft-primary mx-auto mb-4"></div>
            <p className="text-tuft-secondary">Chargement du produit...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !product) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😟</div>
            <h2 className="text-2xl font-bold text-tuft-primary mb-2">Produit non trouvé</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => router.push('/products')}
              className="btn-primary"
            >
              Retour au catalogue
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Breadcrumb */}
      <div className="bg-tuft-light/20 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-tuft-primary">
              Accueil
            </button>
            <span>/</span>
            <button onClick={() => router.push('/products')} className="hover:text-tuft-primary">
              Catalogue
            </button>
            <span>/</span>
            <span className="text-tuft-primary font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Images du produit */}
            <div className="space-y-4">
              {/* Image principale */}
              <div className="aspect-square bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-tuft-light to-white opacity-90 flex items-center justify-center">
                  <div className="text-8xl text-tuft-primary">
                    🧶
                  </div>
                </div>
              </div>
              
              {/* Vignettes */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="aspect-square bg-gradient-to-br from-tuft-light to-tuft-accent rounded-lg opacity-50 hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center">
                    <div className="text-2xl">🧶</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations du produit */}
            <div className="space-y-6">
              {/* En-tête */}
              <div>
                <h1 className="text-4xl font-bold text-tuft-primary mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-tuft-secondary">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                  {product.stock > 0 ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      En stock ({product.stock} disponibles)
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Rupture de stock
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-tuft-primary mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Sélection de la taille */}
              <div>
                <h3 className="text-lg font-semibold text-tuft-primary mb-3">Taille</h3>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        selectedSize === size.id
                          ? 'border-tuft-primary bg-tuft-primary/10'
                          : 'border-tuft-light hover:border-tuft-primary/50'
                      }`}
                    >
                      <div className="font-semibold">{size.name}</div>
                      {size.price > 0 && (
                        <div className="text-sm text-gray-600">
                          +{formatPrice(size.price)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection du matériau */}
              <div>
                <h3 className="text-lg font-semibold text-tuft-primary mb-3">Matériau</h3>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        selectedMaterial === material.id
                          ? 'border-tuft-primary bg-tuft-primary/10'
                          : 'border-tuft-light hover:border-tuft-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{material.name}</div>
                          <div className="text-sm text-gray-600">{material.description}</div>
                        </div>
                        {material.price !== 0 && (
                          <div className={`text-sm font-semibold ${
                            material.price > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {material.price > 0 ? '+' : ''}{formatPrice(material.price)}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-6 border-t border-tuft-light">
                {/* Quantité */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">Quantité:</span>
                  <div className="flex items-center border border-tuft-light rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-tuft-light transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-tuft-light">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2 hover:bg-tuft-light transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn-secondary flex-1"
                    disabled={product.stock === 0}
                    onClick={() => {
                      // TODO: Ajouter au panier
                      alert('Fonctionnalité panier en cours de développement');
                    }}
                  >
                    🛒 Ajouter au panier
                  </button>
                  
                  <button
                    className="btn-primary flex-1"
                    disabled={product.stock === 0}
                    onClick={() => router.push(`/order/${product.slug}`)}
                  >
                    Commander maintenant
                  </button>
                </div>

                {/* Garanties */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="text-center p-4 bg-tuft-light/20 rounded-lg">
                    <div className="text-2xl mb-2">🚚</div>
                    <div className="font-semibold text-sm">Livraison gratuite</div>
                    <div className="text-xs text-gray-600">Dès 200€</div>
                  </div>
                  <div className="text-center p-4 bg-tuft-light/20 rounded-lg">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-semibold text-sm">Fait main</div>
                    <div className="text-xs text-gray-600">Artisan espagnol</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}