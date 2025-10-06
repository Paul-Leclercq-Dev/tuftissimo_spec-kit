import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Tuftissimo</span>
          </div>
          
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Tapis & Créations
            <span className="text-slate-600 block">Tufting Artisanal</span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Découvrez nos créations uniques en tufting. Des tapis personnalisés aux œuvres d'art murales, 
            chaque pièce est réalisée avec passion et savoir-faire artisanal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Découvrir le Catalogue
              </Button>
            </Link>
            <Link href="/custom">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Commande Sur Mesure
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Artisanal</h3>
            <p className="text-slate-600">Chaque pièce est réalisée à la main avec la technique du tufting</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Personnalisé</h3>
            <p className="text-slate-600">Créez votre design unique ou choisissez parmi nos modèles</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Livraison Rapide</h3>
            <p className="text-slate-600">Expédition sous 5-10 jours en Espagne et France</p>
          </div>
        </div>
      </main>
    </div>
  );
}
