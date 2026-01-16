import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';

export function Products() {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Images de murs pour les mises en scène (rotation pour variété)
  const wallImages = [
    'https://images.unsplash.com/photo-1559051704-a687a261e2e1?w=1080',
    'https://images.unsplash.com/photo-1632830025328-cce71800b9ec?w=1080',
    'https://images.unsplash.com/photo-1669726320997-c20c02c662d7?w=1080',
    'https://images.unsplash.com/photo-1559051704-a687a261e2e1?w=1080',
    'https://images.unsplash.com/photo-1632830025328-cce71800b9ec?w=1080',
    'https://images.unsplash.com/photo-1669726320997-c20c02c662d7?w=1080',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-4xl mb-4">NOTRE COLLECTION</h1>
          <p className="text-[#fffaf2]/60">
            {products.length} toiles horloges texturées minimalistes
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#fffaf2]/5 border border-[#fffaf2]/20 px-4 py-2 text-[#fffaf2] focus:outline-none focus:border-[#fffaf2]/40"
          >
            <option value="default">Trier par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            wallImage={wallImages[index]}
          />
        ))}
      </div>
    </div>
  );
}