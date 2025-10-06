import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CustomOrderPage() {
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
            <Link href="/custom" className="text-slate-900 font-medium">
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
            <Link href="/cart" className="text-slate-600 hover:text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5m0 0h9m-9 0h9" />
              </svg>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Connexion</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Commande Sur Mesure
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Créez votre tapis unique selon vos envies. Partagez votre design et recevez un devis personnalisé.
            </p>
          </div>

          {/* Process Steps */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Comment ça marche ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-slate-900">Partagez votre idée</h3>
                <p className="text-sm text-slate-600">Décrivez votre projet et uploadez votre design</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-slate-900">Recevez un devis</h3>
                <p className="text-sm text-slate-600">Nous étudions votre projet et vous envoyons un devis</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-slate-900">Création & livraison</h3>
                <p className="text-sm text-slate-600">Après validation, nous créons votre tapis unique</p>
              </div>
            </div>
          </div>

          {/* Custom Order Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Formulaire de demande</h2>
            
            <form className="space-y-6">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom complet *
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pays *
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="">Sélectionnez votre pays</option>
                    <option value="ES">Espagne</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Détails du projet</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Taille souhaitée *
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Choisir la taille</option>
                      <option value="small">Petite (50x70cm)</option>
                      <option value="medium">Moyenne (80x120cm)</option>
                      <option value="large">Grande (120x180cm)</option>
                      <option value="custom">Taille personnalisée</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Matériau préféré
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Pas de préférence</option>
                      <option value="laine">Laine</option>
                      <option value="coton">Coton</option>
                      <option value="acrylique">Acrylique</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Budget approximatif
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Non défini</option>
                      <option value="200-400">200-400€</option>
                      <option value="400-600">400-600€</option>
                      <option value="600-800">600-800€</option>
                      <option value="800+">Plus de 800€</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description de votre projet *
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez votre idée, les couleurs souhaitées, le style, l'usage prévu..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload de votre design
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <label className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Cliquez pour uploader</span>
                        <span> ou glissez vos fichiers ici</span>
                        <input type="file" className="hidden" accept="image/*" multiple />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG jusqu'à 5MB chacun</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href="/products">
                  <Button variant="outline">Retour au catalogue</Button>
                </Link>
                <Button type="submit" size="lg">
                  Envoyer ma demande
                </Button>
              </div>
            </form>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Quel est le délai de réalisation ?</h3>
                <p className="text-sm text-slate-600">En général, comptez 2-3 semaines pour la création plus 5-10 jours de livraison selon votre localisation.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Quels formats d'images acceptez-vous ?</h3>
                <p className="text-sm text-slate-600">Nous acceptons les formats PNG, JPG et JPEG. Plus la résolution est élevée, mieux nous pourrons reproduire votre design.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Le devis est-il gratuit ?</h3>
                <p className="text-sm text-slate-600">Oui, l'étude de votre projet et le devis sont entièrement gratuits et sans engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}