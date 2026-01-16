import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useCart();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-white/60">Commande non trouvée</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
        <h1 className="text-4xl mb-4">COMMANDE CONFIRMÉE !</h1>
        <p className="text-white/60 text-lg">
          Merci pour votre commande. Un email de confirmation a été envoyé à{' '}
          <span className="text-white">{order.shippingInfo.email}</span>
        </p>
      </div>

      <div className="border border-white/10 bg-white/5 p-8 mb-8">
        <h2 className="text-2xl mb-6">DÉTAILS DE LA COMMANDE</h2>

        <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Numéro de commande</span>
            <span>#{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Date</span>
            <span>
              {new Date(order.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Statut</span>
            <span>En préparation</span>
          </div>
        </div>

        <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover bg-white/5"
              />
              <div className="flex-1">
                <p className="mb-1">{item.name}</p>
                <p className="text-sm text-white/60">Quantité: {item.quantity}</p>
              </div>
              <p>{item.price * item.quantity}€</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
          <div className="flex justify-between text-white/60">
            <span>Sous-total</span>
            <span>{order.total}€</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Livraison</span>
            <span>Gratuite</span>
          </div>
          <div className="flex justify-between text-xl pt-2">
            <span>Total</span>
            <span>{order.total}€</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3">ADRESSE DE LIVRAISON</h3>
          <p className="text-white/60 text-sm">
            {order.shippingInfo.firstName} {order.shippingInfo.lastName}
            <br />
            {order.shippingInfo.address}
            <br />
            {order.shippingInfo.postalCode} {order.shippingInfo.city}
            <br />
            {order.shippingInfo.phone}
          </p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-white/60">
          Votre commande sera expédiée sous 48h. Vous recevrez un email de suivi dès l'expédition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/commandes"
            className="inline-block bg-white text-black px-8 py-3 hover:bg-white/90 transition-colors"
          >
            Voir mes commandes
          </Link>
          <Link
            to="/produits"
            className="inline-block border border-white/20 px-8 py-3 hover:bg-white/5 transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}