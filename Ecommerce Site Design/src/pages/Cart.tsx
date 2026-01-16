import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-white/40" />
          <h1 className="text-3xl mb-4">VOTRE PANIER EST VIDE</h1>
          <p className="text-white/60 mb-8">
            Découvrez notre collection de toiles horloges texturées
          </p>
          <Link
            to="/produits"
            className="inline-block bg-white text-black px-8 py-3 hover:bg-white/90 transition-colors"
          >
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-12">PANIER</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 border border-white/10 bg-white/5"
            >
              <Link
                to={`/produit/${item.id}`}
                className="w-32 h-32 flex-shrink-0 bg-white/5 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </Link>

              <div className="flex-1 flex flex-col">
                <Link
                  to={`/produit/${item.id}`}
                  className="text-xl mb-2 hover:text-white/70 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-white/60 mb-2">{item.texture}</p>
                <p className="text-sm text-white/60 mb-4">{item.dimensions}</p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xl">{item.price * item.quantity}€</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-white/40 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-white/10 bg-white/5 p-6 sticky top-24">
            <h2 className="text-2xl mb-6">RÉCAPITULATIF</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/60">
                <span>Sous-total</span>
                <span>{getCartTotal()}€</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                <span>Total</span>
                <span>{getCartTotal()}€</span>
              </div>
            </div>

            <Link
              to="/paiement"
              className="block w-full bg-white text-black py-4 text-center hover:bg-white/90 transition-colors mb-3"
            >
              Procéder au paiement
            </Link>

            <Link
              to="/produits"
              className="block w-full border border-white/20 py-4 text-center hover:bg-white/5 transition-colors"
            >
              Continuer mes achats
            </Link>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-white/60">
                • Livraison gratuite sur toutes les commandes
                <br />
                • Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}