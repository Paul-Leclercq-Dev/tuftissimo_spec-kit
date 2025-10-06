'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/services/productService';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <Button onClick={loadProducts} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Product Catalog</h1>
      
      <div className="mb-4">
        <p className="text-slate-600">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">No products available</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-slate-200 rounded mb-4 flex items-center justify-center">
                  <span className="text-slate-500">No image</span>
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-slate-600 mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  €{product.price.toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="mb-2">
                <span className="text-sm text-slate-500">Category: {product.category}</span>
              </div>
              
              <Button 
                className="w-full"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Unavailable'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
