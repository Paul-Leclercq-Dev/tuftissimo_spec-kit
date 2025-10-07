'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Erreur lors du chargement des produits');
      }
    } catch (err) {
      setError('Impossible de charger les produits');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceCents: number) => {
    return `${(priceCents / 100).toFixed(2)}€`;
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tuft-primary mx-auto mb-4"></div>
            <p className="text-tuft-secondary">Chargement des créations...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😟</div>
            <h2 className="text-2xl font-bold text-tuft-primary mb-2">Oops !</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero Section Catalogue */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-tuft-primary mb-6 animate-fade-in">
            Notre Catalogue
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Découvrez notre collection de tapis artisanaux. Chaque pièce est unique, 
            créée avec passion dans notre atelier espagnol.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-12 mt-12 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-tuft-primary">{products.length}</div>
              <div className="text-sm text-gray-600">Créations disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tuft-primary">100%</div>
              <div className="text-sm text-gray-600">Fait main</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tuft-primary">48h</div>
              <div className="text-sm text-gray-600">Expédition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et tri */}
      <section className="py-8 bg-white border-b border-tuft-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-tuft-primary">Filtrer par:</span>
              <select className="px-4 py-2 border border-tuft-light rounded-lg focus:ring-2 focus:ring-tuft-primary focus:border-transparent">
                <option>Tous les tapis</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{products.length} produits trouvés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des produits */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🧶</div>
              <h3 className="text-2xl font-bold text-tuft-primary mb-2">Aucun produit disponible</h3>
              <p className="text-gray-600">Nos artisans préparent de nouvelles créations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="card-premium overflow-hidden group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => router.push(`/products/${product.slug}`)}
                >
                  {/* Image placeholder avec style premium */}
                  <div className="relative h-64 bg-gradient-to-br from-tuft-primary to-tuft-secondary overflow-hidden">
                    {/* Pattern mockup */}
                    <div className="absolute inset-2 bg-gradient-to-br from-tuft-light to-white rounded-lg opacity-90">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-tuft-primary group-hover:scale-110 transition-transform">
                          🧶
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge stock */}
                    {product.stock > 0 ? (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        En stock ({product.stock})
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Rupture
                      </div>
                    )}
                    
                    {/* Prix */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-tuft-primary px-3 py-2 rounded-lg font-bold shadow-lg">
                      {formatPrice(product.priceCents)}
                    </div>
                    
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-tuft-primary/0 group-hover:bg-tuft-primary/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-tuft-primary px-6 py-3 rounded-lg font-semibold shadow-lg transform scale-95 group-hover:scale-100 transition-transform">
                        Voir les détails
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-tuft-primary mb-2 group-hover:text-tuft-secondary transition-colors">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-tuft-primary">
                        {formatPrice(product.priceCents)}
                      </div>
                      
                      {product.stock > 0 ? (
                        <button 
                          className="btn-secondary text-sm px-4 py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Ajouter au panier
                          }}
                        >
                          Ajouter au panier
                        </button>
                      ) : (
                        <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-semibold cursor-not-allowed">
                          Rupture de stock
                        </button>
                      )}
                    </div>
                    
                    {/* Détails techniques */}
                    <div className="mt-4 pt-4 border-t border-tuft-light/50">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Réf: TUF-{product.id.toString().padStart(3, '0')}</span>
                        <span>Fait main</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}