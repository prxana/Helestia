import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import heroBanner from 'figma:asset/3b2d84ddcab0c0ef5ca21b11ea4f0ca7afe0f150.png';

export function Home() {
  const featuredProducts = products.slice(0, 3);

  // Images de murs pour les mises en scène
  const wallImages = [
    'https://images.unsplash.com/photo-1559051704-a687a261e2e1?w=1080',
    'https://images.unsplash.com/photo-1632830025328-cce71800b9ec?w=1080',
    'https://images.unsplash.com/photo-1669726320997-c20c02c662d7?w=1080',
  ];

  return (
    <div>
      {/* Hero Section with Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="HELESTIA Collection" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay with gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl mb-6 tracking-wider text-[#fffaf2] drop-shadow-2xl">
            HELESTIA
          </h1>
          <p className="text-xl md:text-2xl text-[#fffaf2] mb-8 max-w-2xl mx-auto drop-shadow-xl">
            Toiles horloges texturées minimalistes
          </p>
          <p className="text-[#fffaf2]/95 mb-12 max-w-xl mx-auto drop-shadow-lg">
            Sublimez votre intérieur avec nos créations uniques alliant art et fonctionnalité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/produits"
              className="inline-flex items-center justify-center gap-2 bg-[#fffaf2] text-black px-8 py-4 hover:bg-[#fffaf2]/90 transition-colors shadow-2xl hover:shadow-[#fffaf2]/20"
            >
              Découvrir la collection
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/personnalisation"
              className="inline-flex items-center justify-center gap-2 bg-black/50 backdrop-blur-md border-2 border-[#fffaf2]/40 px-8 py-4 hover:bg-black/60 hover:border-[#fffaf2]/60 transition-all text-[#fffaf2] shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Créer ma toile personnalisée
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">NOS CRÉATIONS</h2>
          <p className="text-[#fffaf2]/60">
            Une sélection de nos toiles horloges les plus appréciées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              wallImage={wallImages[index]}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 border border-[#fffaf2]/20 px-8 py-3 hover:bg-[#fffaf2]/5 transition-colors"
          >
            Voir toute la collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">HELESTIA, L'ART DU TEMPS</h2>
        
        <div className="space-y-8 text-[#fffaf2]/70 leading-relaxed text-center">
          <p>
            Emménager dans un nouvel espace, ne sera plus la cause de vos inquiétudes, laissez les cartons en attente, et oubliez un instant le travail qui vous attend. Enfin, imaginez une pièce vide, fraîchement libérée de son mobilier ou en pleine transformation. Qu'il s'agisse d'une envie de changement ou d'un renouveau dans votre intérieur, chaque espace devient une page blanche à écrire. Helistia intervient pour y apporter sa touche unique.
          </p>

          <p>
            Et si vous ne vous contentiez plus d'une simple décoration monotone mais laissiez entrer dans votre espace une présence inattendue ? Accueillez vos hôtes dans un lieu où l'empreinte, la trace et la texture prennent place. Chez Helistia nous façonnons poétiquement la rencontre entre l'art et le temps.
          </p>

          <p>
            Dans votre pièce, chaque regard sur la surface révèle un détail nouveau. La lumière imprègne doucement les murs au fil de la journée, et les reliefs attirent le regard comme autant de points de repère. Les aiguilles de l'horloge glissent silencieusement, rendant chaque instant perceptible tout en s'intégrant naturellement à votre décoration. L'espace devient vivant, le temps s'inscrit dans la matière, et chaque mouvement dans la pièce s'harmonise avec le rythme subtil que crée la composition.
          </p>

          <p>
            Cette rencontre entre matière et temps transforme votre intérieur en un espace vivant. Le temps se fait sentir sans s'imposer, et l'art se mêle à votre quotidien, apportant à votre pièce une présence qui s'inscrit dans la matière. Chaque instant dans cet environnement raconte une histoire, un échange entre lumière, reliefs et mouvement, où la perception du temps devient une expérience à vivre.
          </p>

          <p className="text-[#fffaf2]/80 pt-4">
            N'attendez plus, laissez Helistia installer dans votre intérieur cette harmonie entre art et temps, et faites de chaque instant un moment à ressentir.
          </p>
        </div>
      </section>
    </div>
  );
}