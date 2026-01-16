import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Lock } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/panier');
    }
  }, [cart.length, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        total: getCartTotal(),
        status: 'processing' as const,
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
      };

      addOrder(newOrder);
      clearCart();
      navigate(`/confirmation/${orderId}`);
    }, 2000);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-12">PAIEMENT</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl mb-6">Informations de livraison</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm text-white/60 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm text-white/60 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-white/60 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm text-white/60 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm text-white/60 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm text-white/60 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6" />
              <h2 className="text-2xl">INFORMATIONS DE PAIEMENT</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm text-white/60 mb-2">
                  Numéro de carte *
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="cardName" className="block text-sm text-white/60 mb-2">
                  Nom sur la carte *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm text-white/60 mb-2">
                    Date d'expiration *
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    required
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength={5}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm text-white/60 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    required
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength={3}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Lock className="w-4 h-4" />
              <p>Paiement 100% sécurisé via SSL</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-white/10 bg-white/5 p-6 sticky top-24">
            <h2 className="text-2xl mb-6">Votre commande</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover bg-white/5"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.name}</p>
                    <p className="text-sm text-white/60">Qté: {item.quantity}</p>
                  </div>
                  <p className="text-sm">{item.price * item.quantity}€</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
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

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black py-4 mt-6 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}