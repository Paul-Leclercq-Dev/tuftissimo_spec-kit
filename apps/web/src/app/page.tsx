'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceCents: number) => {
    return `${(priceCents / 100).toFixed(2)}€`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation unifiée */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-tuft-light z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-tuft-primary">Tuftissimo</span>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                Accueil
              </button>
              <button onClick={() => scrollToSection('catalogue')} className="text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                Catalogue
              </button>
              <button onClick={() => scrollToSection('sur-mesure')} className="text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                Sur mesure
              </button>
              <button onClick={() => scrollToSection('processus')} className="text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                Processus
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                Contact
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Panier responsive */}
              <button className="relative p-2 text-tuft-primary hover:text-tuft-secondary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L7 13M7 13l-2.293 2.293A1 1 0 005 17h12M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M15 1v6m-6-6v6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tuft-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Bouton connexion */}
              <Link href="/admin" className="btn-outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Connexion
              </Link>

              {/* Menu mobile */}
              <button 
                className="md:hidden text-tuft-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-tuft-light py-4">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('accueil')} className="text-left text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                  Accueil
                </button>
                <button onClick={() => scrollToSection('catalogue')} className="text-left text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                  Catalogue
                </button>
                <button onClick={() => scrollToSection('sur-mesure')} className="text-left text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                  Sur mesure
                </button>
                <button onClick={() => scrollToSection('processus')} className="text-left text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                  Processus
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-tuft-primary hover:text-tuft-secondary transition-colors font-medium">
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Section Accueil */}
      <section id="accueil" className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
        {/* Animations de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-tuft-primary rounded-full mix-blend-multiply filter blur-xl animate-bounce"></div>
          <div className="absolute top-0 right-4 w-96 h-96 bg-tuft-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-tuft-gold rounded-full mix-blend-multiply filter blur-xl animate-bounce delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Contenu textuel */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block px-4 py-2 bg-tuft-accent/20 text-tuft-primary font-semibold rounded-full text-sm mb-6 animate-slide-up">
              ✨ Artisanat Premium depuis 2024
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-tuft-primary mb-6 animate-slide-up">
              Tapis d'Exception
              <br />
              <span className="bg-gradient-to-r from-tuft-secondary to-tuft-gold bg-clip-text text-transparent">
                Fait Main
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl animate-slide-up">
              Découvrez l&apos;art du tuft gun dans notre atelier espagnol. 
              Chaque tapis raconte une histoire unique, tissée avec passion et expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button onClick={() => scrollToSection('catalogue')} className="btn-primary btn-large">
                Découvrir la collection
              </button>
              <button onClick={() => scrollToSection('sur-mesure')} className="btn-secondary btn-large">
                Créer sur mesure
              </button>
            </div>
          </div>

          {/* Galerie visuelle */}
          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-tuft-light to-white opacity-90 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">🧶</span>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-tuft-accent to-tuft-gold rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-white to-tuft-light opacity-90 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="h-32 bg-gradient-to-br from-tuft-secondary to-tuft-primary rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-tuft-light to-white opacity-90 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                </div>
                <div className="h-48 bg-gradient-to-br from-tuft-gold to-tuft-accent rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-white to-tuft-light opacity-90 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('catalogue')} className="text-tuft-primary hover:text-tuft-secondary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Section Catalogue */}
      <section id="catalogue" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tuft-primary mb-4">Notre Catalogue</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection de tapis artisanaux. Chaque pièce est unique.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tuft-primary mx-auto mb-4"></div>
              <p className="text-tuft-secondary">Chargement des créations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product, index) => (
                <div key={product.id} className="card-premium overflow-hidden group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative h-64 bg-gradient-to-br from-tuft-primary to-tuft-secondary overflow-hidden">
                    <div className="absolute inset-2 bg-gradient-to-br from-tuft-light to-white rounded-lg opacity-90">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-tuft-primary group-hover:scale-110 transition-transform">🧶</div>
                      </div>
                    </div>
                    {product.stock > 0 ? (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        En stock
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Rupture
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-tuft-primary mb-2">{product.name}</h3>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-tuft-primary">
                        {formatPrice(product.priceCents)}
                      </div>
                      <button className="btn-primary btn-small">
                        Voir détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button onClick={() => scrollToSection('sur-mesure')} className="btn-secondary btn-large">
              Voir tous les produits
            </button>
          </div>
        </div>
      </section>

      {/* Section Sur Mesure */}
      <section id="sur-mesure" className="py-20 bg-gradient-to-br from-tuft-light to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-tuft-primary mb-6">Création Sur Mesure</h2>
              <p className="text-xl text-gray-600 mb-8">
                Transformez votre vision en réalité. Nos artisans créent le tapis de vos rêves selon vos dimensions, couleurs et motifs préférés.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-tuft-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-tuft-primary">Consultation personnalisée</h3>
                    <p className="text-gray-600 text-sm">Échangez avec nos designers pour définir votre projet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-tuft-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-tuft-primary">Devis détaillé</h3>
                    <p className="text-gray-600 text-sm">Recevez un devis transparent sous 48h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-tuft-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-tuft-primary">Création artisanale</h3>
                    <p className="text-gray-600 text-sm">Fabrication dans notre atelier espagnol (2-4 semaines)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button onClick={() => scrollToSection('contact')} className="btn-primary btn-large mr-4">
                  Demander un devis
                </button>
                <button onClick={() => scrollToSection('processus')} className="btn-ghost">
                  Voir le processus
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-tuft-accent to-tuft-gold rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-gradient-to-br from-white to-tuft-light opacity-90 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎨</div>
                    <p className="text-tuft-primary font-semibold">Votre imagination,<br />notre savoir-faire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section id="processus" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tuft-primary mb-4">Notre Processus Artisanal</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De la conception à la livraison, découvrez les étapes de création de votre tapis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎯', title: 'Design', description: 'Conception du motif et choix des couleurs' },
              { icon: '🧶', title: 'Matériaux', description: 'Sélection des fibres premium' },
              { icon: '✋', title: 'Tuft Gun', description: 'Création manuelle à la tuft gun' },
              { icon: '✨', title: 'Finition', description: 'Découpe et finitions soignées' }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-full flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-tuft-primary mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-tuft-primary to-tuft-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-xl text-white/90 mb-8">
                Prêt à créer votre tapis sur mesure ? Notre équipe est là pour vous accompagner dans votre projet.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-tuft-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@tuftissimo.es</span>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-tuft-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+34 123 456 789</span>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-tuft-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Atelier Tuftissimo, Barcelone, Espagne</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-tuft-primary mb-6">Demandez votre devis</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Votre nom" className="w-full px-4 py-3 border border-tuft-light rounded-lg focus:ring-2 focus:ring-tuft-primary focus:border-transparent" />
                </div>
                <div>
                  <input type="email" placeholder="Votre email" className="w-full px-4 py-3 border border-tuft-light rounded-lg focus:ring-2 focus:ring-tuft-primary focus:border-transparent" />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-tuft-light rounded-lg focus:ring-2 focus:ring-tuft-primary focus:border-transparent">
                    <option>Type de projet</option>
                    <option>Tapis sur mesure</option>
                    <option>Commande catalogue</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div>
                  <textarea rows={4} placeholder="Décrivez votre projet..." className="w-full px-4 py-3 border border-tuft-light rounded-lg focus:ring-2 focus:ring-tuft-primary focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary btn-large">
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tuft-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-tuft-secondary to-tuft-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">Tuftissimo</span>
              </div>
              <p className="text-white/80 text-sm">
                Artisan créateur de tapis premium depuis 2024. Chaque pièce raconte une histoire unique.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('accueil')} className="block text-white/80 hover:text-white transition-colors">Accueil</button>
                <button onClick={() => scrollToSection('catalogue')} className="block text-white/80 hover:text-white transition-colors">Catalogue</button>
                <button onClick={() => scrollToSection('sur-mesure')} className="block text-white/80 hover:text-white transition-colors">Sur mesure</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>contact@tuftissimo.es</p>
                <p>+34 123 456 789</p>
                <p>Barcelone, Espagne</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-sm">📷</span>
                </button>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-sm">📘</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 Tuftissimo. Tous droits réservés. Artisanat premium d'Espagne.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}