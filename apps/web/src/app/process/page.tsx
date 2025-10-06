import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProcessPage() {
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
            <Link href="/process" className="text-slate-900 font-medium">
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
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Le Processus Tufting
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez comment nous créons vos tapis uniques grâce à la technique artisanale du tufting.
            </p>
          </div>

          {/* What is Tufting */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Qu'est-ce que le Tufting ?</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Le tufting est une technique artisanale qui consiste à insérer des fils dans une toile tendue 
                  à l'aide d'un pistolet spécialisé. Cette méthode permet de créer des motifs complexes et 
                  des textures variées avec une précision remarquable.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Contrairement aux techniques industrielles, le tufting artisanal permet une liberté créative 
                  totale et la réalisation de pièces véritablement uniques, adaptées aux goûts et besoins 
                  spécifiques de chaque client.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <svg className="w-24 h-24 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p className="text-slate-600 text-sm">Technique artisanale<br />100% fait main</p>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Notre Processus de Création</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Conception & Design</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Nous analysons votre projet, créons ou adaptons le design selon vos spécifications. 
                    Chaque motif est soigneusement étudié pour optimiser le rendu final et respecter 
                    les contraintes techniques du tufting.
                  </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">2</span>
                  </div>
                </div>
                <div className="flex-1 text-right lg:text-left">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Préparation des Matériaux</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Sélection minutieuse des fils selon le matériau choisi (laine, coton, acrylique). 
                    Préparation de la toile de base, tension sur le cadre de travail et organisation 
                    des couleurs selon le plan de création.
                  </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xl">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Tufting Artisanal</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Le cœur du processus : création du motif point par point avec le pistolet à tufting. 
                    Cette étape demande précision, patience et savoir-faire pour obtenir la densité 
                    et la texture souhaitées sur l'ensemble de la pièce.
                  </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 011.75.75l1 1.75M15 10h-1.5a2.5 2.5 0 00-1.75.75l-1 1.75" />
                  </svg>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xl">4</span>
                  </div>
                </div>
                <div className="flex-1 text-right lg:text-left">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Finitions & Support</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Application de la colle textile au dos pour fixer les fils, puis ajout du support 
                    choisi (standard, antidérapant ou premium). Découpe précise des contours et 
                    finition des bordures pour un résultat professionnel.
                  </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">5</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Contrôle & Expédition</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Inspection minutieuse de la qualité, nettoyage final et emballage soigné. 
                    Votre tapis unique est prêt pour l'expédition avec un soin particulier 
                    pour qu'il arrive en parfait état chez vous.
                  </p>
                </div>
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Materials & Quality */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Matériaux Utilisés</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-medium text-slate-900">Laine</h3>
                    <p className="text-sm text-slate-600">Douce, durable et naturellement isolante</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-medium text-slate-900">Coton</h3>
                    <p className="text-sm text-slate-600">Facile d'entretien et hypoallergénique</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-medium text-slate-900">Acrylique</h3>
                    <p className="text-sm text-slate-600">Résistant et économique</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Garantie Qualité</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Fils de haute qualité</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Résistance à l'usure</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Couleurs grand teint</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Finitions professionnelles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Prêt à créer votre tapis unique ?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Découvrez notre catalogue ou lancez-vous dans un projet sur mesure. 
              Chaque création est une œuvre d'art fonctionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">Voir le Catalogue</Button>
              </Link>
              <Link href="/custom">
                <Button variant="outline" size="lg">Projet Sur Mesure</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}