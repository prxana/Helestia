import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-white/60">Produit non trouvé</p>
        <Link to="/produits" className="text-white hover:text-white/70 mt-4 inline-block">
          ← Retour aux produits
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/produits"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl mb-4">{product.name}</h1>
          <p className="text-3xl mb-6">{product.price}€</p>

          <div className="border-t border-white/10 pt-6 mb-6">
            <p className="text-white/80 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Texture</span>
                <span>{product.texture}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Dimensions</span>
                <span>{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Mécanisme</span>
                <span>Quartz silencieux</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Matériaux</span>
                <span>Canvas premium, bois</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-4 hover:bg-white/90 transition-colors mb-4 flex items-center justify-center gap-2"
          >
            {showConfirmation ? (
              <>
                <Check className="w-5 h-5" />
                Ajouté au panier
              </>
            ) : (
              'Ajouter au panier'
            )}
          </button>

          <Link
            to="/panier"
            className="w-full border border-white/20 text-white py-4 hover:bg-white/5 transition-colors text-center"
          >
            Voir le panier
          </Link>

          {/* Features */}
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-white/60 mt-1" />
              <div>
                <p className="mb-1">Livraison gratuite</p>
                <p className="text-sm text-white/60">Expédition sous 48h, livraison en 3-5 jours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-white/60 mt-1" />
              <div>
                <p className="mb-1">Paiement sécurisé</p>
                <p className="text-sm text-white/60">Transactions 100% protégées</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-3xl mb-8">VOUS AIMEREZ AUSSI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/produit/${relatedProduct.id}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-white/5 mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl mb-2 group-hover:text-white/70 transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-lg">{relatedProduct.price}€</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}