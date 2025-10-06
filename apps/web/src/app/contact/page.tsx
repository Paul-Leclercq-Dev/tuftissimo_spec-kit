import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
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
            <Link href="/contact" className="text-slate-900 font-medium">
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
              Contactez-nous
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une question ? Un projet spécial ? N'hésitez pas à nous contacter, nous serons ravis de vous aider.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom *
                    </label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom *
                    </label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
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
                    Sujet *
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="">Choisissez un sujet</option>
                    <option value="info-produit">Information produit</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="custom">Projet sur mesure</option>
                    <option value="livraison">Livraison / Expédition</option>
                    <option value="retour">Retour / Échange</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez votre demande..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="consent" className="mr-2" required />
                  <label htmlFor="consent" className="text-sm text-slate-600">
                    J'accepte que mes données soient utilisées pour répondre à ma demande *
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Informations de contact</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-slate-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-slate-600">contact@tuftissimo.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-slate-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Téléphone</p>
                      <p className="text-slate-600">+34 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-slate-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Localisation</p>
                      <p className="text-slate-600">Espagne & France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Horaires de réponse</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lundi - Vendredi</span>
                    <span className="text-slate-900">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Samedi</span>
                    <span className="text-slate-900">10h - 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dimanche</span>
                    <span className="text-slate-900">Fermé</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    💬 Nous répondons généralement sous 24h les jours ouvrés
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">FAQ Rapide</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Livraison en combien de temps ?</p>
                    <p className="text-slate-600 text-sm">5-10 jours en Espagne et France</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Retours acceptés ?</p>
                    <p className="text-slate-600 text-sm">Oui, 14 jours pour changer d'avis</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Commande sur mesure ?</p>
                    <p className="text-slate-600 text-sm">Devis gratuit sous 48h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}