import Link from "next/link";
import { Button } from "@/components/ui/button";

// Données de test pour le panier
const mockCartItems = [
  {
    id: 1,
    name: "Tapis Berbère Moderne",
    price: 45000, // en centimes
    quantity: 1,
    material: "laine",
    size: "small",
    backing: "standard",
  },
  {
    id: 2,
    name: "Tapis Abstrait Coloré",
    price: 67500,
    quantity: 2,
    material: "coton",
    size: "medium",
    backing: "antislip",
  }
];

const formatPrice = (priceInCents: number) => {
  return (priceInCents / 100).toFixed(2) + " €";
};

const calculateSubtotal = (items: typeof mockCartItems) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateShipping = (country: string) => {
  // Logique selon WORKFLOW_COMMANDES.md
  if (country === "ES") return 500; // 5€ en centimes
  if (country === "FR") return 1000; // 10€ en centimes
  return 0;
};

const calculateVAT = (subtotal: number) => {
  return Math.round(subtotal * 0.21); // 21% TVA
};

export default function CartPage() {
  const subtotal = calculateSubtotal(mockCartItems);
  const shipping = calculateShipping("ES"); // Par défaut Espagne
  const vat = calculateVAT(subtotal);
  const total = subtotal + shipping + vat;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Tuftissimo</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
              Catalogue
            </Link>
            <Link href="/custom" className="text-slate-600 hover:text-slate-900 transition-colors">
              Sur Mesure
            </Link>
            <Link href="/process" className="text-slate-600 hover:text-slate-900 transition-colors">
              Processus
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-slate-900 font-medium">
              <div className="flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5m0 0h9m-9 0h9" />
                </svg>
                <span className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {mockCartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Connexion</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Votre Panier</h1>
          
          {mockCartItems.length === 0 ? (
            // Empty Cart
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5m0 0h9m-9 0h9" />
              </svg>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Votre panier est vide</h2>
              <p className="text-slate-600 mb-8">Découvrez nos créations uniques ou créez votre tapis sur mesure</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg">Voir le Catalogue</Button>
                </Link>
                <Link href="/custom">
                  <Button variant="outline" size="lg">Commande Sur Mesure</Button>
                </Link>
              </div>
            </div>
          ) : (
            // Cart with items
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {item.material}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {item.size}
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            {item.backing}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-slate-500">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button className="text-red-500 hover:text-red-700 p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="flex justify-start">
                  <Link href="/products">
                    <Button variant="outline">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Résumé de commande</h2>
                  
                  {/* Delivery Country */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Pays de livraison
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="ES">Espagne</option>
                      <option value="FR">France</option>
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Sous-total ({mockCartItems.reduce((t, i) => t + i.quantity, 0)} articles)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-slate-600">
                      <span>Frais de port</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    
                    <div className="flex justify-between text-slate-600">
                      <span>TVA (21%)</span>
                      <span>{formatPrice(vat)}</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold text-slate-900">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full mb-4" size="lg">
                    Procéder au paiement
                  </Button>

                  {/* Security Info */}
                  <div className="text-center text-sm text-slate-500">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Paiement sécurisé</span>
                    </div>
                    <p>Vos données sont protégées</p>
                  </div>

                  {/* Shipping Info */}
                  <div className="mt-6 p-3 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-blue-900 mb-2">Livraison</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Expédition sous 5-10 jours</li>
                      <li>• Suivi de commande inclus</li>
                      <li>• Retours acceptés (14 jours)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}