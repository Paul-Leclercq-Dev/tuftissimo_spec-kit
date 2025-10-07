'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PublicNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-tuft-light shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Premium */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-tuft-primary tracking-tight">
                Tuftissimo
              </div>
              <div className="text-tuft-gold text-xs font-medium -mt-1 hidden sm:block">
                Artisan Tapis depuis 2024
              </div>
            </div>
          </Link>

          {/* Navigation Desktop Premium */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-tuft-primary hover:bg-tuft-light transition-all font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/products" 
              className="px-4 py-2 rounded-lg text-tuft-primary hover:bg-tuft-light transition-all font-medium"
            >
              Catalogue
            </Link>
            <Link 
              href="/custom" 
              className="px-4 py-2 rounded-lg text-tuft-primary hover:bg-tuft-light transition-all font-medium"
            >
              Sur mesure
            </Link>
            <Link 
              href="/process" 
              className="px-4 py-2 rounded-lg text-tuft-primary hover:bg-tuft-light transition-all font-medium"
            >
              Processus
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 rounded-lg text-tuft-primary hover:bg-tuft-light transition-all font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Connexion */}
            <Link 
              href="/auth/login" 
              className="flex items-center space-x-2 px-4 py-2 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Connexion</span>
            </Link>
            
            {/* Panier Premium */}
            <Link 
              href="/cart" 
              className="relative flex items-center space-x-2 bg-tuft-primary hover:bg-tuft-secondary text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6.5-5H9" />
              </svg>
              <span>Panier</span>
              {/* Badge quantité */}
              <div className="absolute -top-2 -right-2 bg-tuft-accent text-tuft-primary text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                0
              </div>
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Panier Mobile */}
            <Link 
              href="/cart" 
              className="relative p-2 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6.5-5H9" />
              </svg>
              <div className="absolute -top-1 -right-1 bg-tuft-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                0
              </div>
            </Link>
            
            {/* Menu Button */}
            <button
              className="p-2 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile Premium */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-tuft-light shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-1">
                <Link 
                  href="/" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🏠</span>
                  <span className="ml-3">Accueil</span>
                </Link>
                <Link 
                  href="/products" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🎨</span>
                  <span className="ml-3">Catalogue</span>
                </Link>
                <Link 
                  href="/custom" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>✨</span>
                  <span className="ml-3">Sur mesure</span>
                </Link>
                <Link 
                  href="/process" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🏭</span>
                  <span className="ml-3">Processus</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>📞</span>
                  <span className="ml-3">Contact</span>
                </Link>
                
                {/* Séparateur */}
                <div className="h-px bg-tuft-light my-2"></div>
                
                {/* Connexion Mobile */}
                <Link 
                  href="/auth/login" 
                  className="flex items-center px-4 py-3 text-tuft-primary hover:bg-tuft-light rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="ml-3">Connexion</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}