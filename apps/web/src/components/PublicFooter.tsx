import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="bg-tuft-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-tuft-accent mb-4">
              Tuftissimo
            </h3>
            <p className="text-gray-200 mb-4">
              Créateur de tapis artisanaux uniques avec la technique du tufting. 
              Chaque pièce est réalisée à la main avec passion et savoir-faire.
            </p>
            <p className="text-tuft-accent">
              📍 Fabriqué en Espagne avec amour
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-tuft-accent mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-tuft-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-200 hover:text-tuft-accent transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-200 hover:text-tuft-accent transition-colors">
                  Sur mesure
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-gray-200 hover:text-tuft-accent transition-colors">
                  Processus Tufting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-tuft-accent mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-200">
              <li>
                <Link href="/contact" className="hover:text-tuft-accent transition-colors">
                  Formulaire de contact
                </Link>
              </li>
              <li>
                <a href="mailto:hello@tuftissimo.com" className="hover:text-tuft-accent transition-colors">
                  hello@tuftissimo.com
                </a>
              </li>
              <li className="text-sm">
                Livraison France & Espagne
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-tuft-secondary mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Tuftissimo. Tous droits réservés. | 
            <Link href="/legal" className="text-tuft-accent hover:underline ml-1">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}