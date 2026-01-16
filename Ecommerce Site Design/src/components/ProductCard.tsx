import { Link } from 'react-router-dom';
import { Product } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  wallImage: string;
}

export function ProductCard({ product, wallImage }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/produit/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fffaf2]/5 mb-4">
        {/* Image par défaut (mise en scène complète) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vue rapprochée au survol */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src={product.hoverImage || product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay avec détails au survol */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <p className="text-sm text-[#fffaf2]/80 mb-1">Voir en détail</p>
              <p className="text-xs text-[#fffaf2]/60">{product.texture}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl group-hover:text-[#fffaf2]/70 transition-colors">
          {product.name}
        </h3>
        <p className="text-[#fffaf2]/60 text-sm">{product.dimensions}</p>
        <p className="text-lg">{product.price}€</p>
      </div>
    </Link>
  );
}