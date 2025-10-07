import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section Ultra Premium */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
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
            
            <h1 className="text-6xl md:text-8xl font-bold text-tuft-primary mb-6 leading-tight animate-slide-up">
              Tuftissimo
              <span className="block text-3xl md:text-5xl text-tuft-secondary font-light mt-2">
                L'art du tapis réinventé
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl animate-slide-up leading-relaxed">
              Transformez votre intérieur avec nos créations uniques. 
              Chaque tapis raconte une histoire, la vôtre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slide-up">
              <Link href="/products" className="btn-primary text-lg group">
                <span>Découvrir le catalogue</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/custom" className="btn-secondary text-lg group">
                <span>Créer sur mesure</span>
                <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 mt-12 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-tuft-primary">500+</div>
                <div className="text-sm text-gray-600">Tapis créés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tuft-primary">98%</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tuft-primary">2</div>
                <div className="text-sm text-gray-600">Pays livrés</div>
              </div>
            </div>
          </div>
          
          {/* Visual Hero - Galerie de tapis */}
          <div className="relative animate-fade-in">
            {/* Grille de tapis mockup */}
            <div className="grid grid-cols-2 gap-4 transform rotate-2">
              {/* Tapis 1 - Principal */}
              <div className="col-span-2 card-premium p-6 bg-gradient-to-br from-tuft-light to-white">
                <div className="aspect-square bg-gradient-to-br from-tuft-primary to-tuft-secondary rounded-xl flex items-center justify-center text-white text-6xl font-bold shadow-lg">
                  🧶
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-tuft-primary">Tapis Unique 001</h3>
                  <p className="text-tuft-gold font-semibold">64,99€</p>
                </div>
              </div>
              
              {/* Tapis 2 */}
              <div className="card-premium p-4 bg-gradient-to-br from-tuft-accent/20 to-white">
                <div className="aspect-square bg-gradient-to-br from-tuft-accent to-tuft-gold rounded-lg flex items-center justify-center text-tuft-primary text-4xl font-bold">
                  🎨
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-semibold text-tuft-primary text-sm">Tapis Rouge</h4>
                  <p className="text-tuft-gold text-sm">34,99€</p>
                </div>
              </div>
              
              {/* Tapis 3 */}
              <div className="card-premium p-4 bg-gradient-to-br from-tuft-light to-tuft-accent/10">
                <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                  🌿
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-semibold text-tuft-primary text-sm">Tapis Vert</h4>
                  <p className="text-tuft-gold text-sm">27,99€</p>
                </div>
              </div>
            </div>
            
            {/* Badge "Nouveau" */}
            <div className="absolute -top-4 -right-4 bg-tuft-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
              Nouveau !
            </div>
            
            {/* Étoiles flottantes */}
            <div className="absolute -top-6 -left-6 text-tuft-accent text-2xl animate-pulse">✨</div>
            <div className="absolute top-1/2 -right-8 text-tuft-gold text-xl animate-bounce delay-500">⭐</div>
            <div className="absolute -bottom-4 left-1/4 text-tuft-primary text-lg animate-pulse delay-1000">💎</div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-tuft-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-tuft-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à transformer votre espace ?
          </h2>
          <p className="text-xl mb-8 text-tuft-accent max-w-2xl mx-auto">
            Rejoignez nos clients satisfaits et découvrez la magie du tufting artisanal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-tuft-accent text-tuft-primary px-8 py-4 rounded-lg font-semibold hover:bg-tuft-gold transition-colors">
              Voir nos créations
            </Link>
            <Link href="/contact" className="border-2 border-tuft-accent text-tuft-accent px-8 py-4 rounded-lg font-semibold hover:bg-tuft-accent hover:text-tuft-primary transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}