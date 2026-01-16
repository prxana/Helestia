import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export function Orders() {
  const { orders } = useCart();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En préparation';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      default:
        return status;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <Package className="w-16 h-16 mx-auto mb-6 text-white/40" />
          <h1 className="text-3xl mb-4">Aucune commande</h1>
          <p className="text-white/60 mb-8">
            Vous n'avez pas encore passé de commande
          </p>
          <Link
            to="/produits"
            className="inline-block bg-white text-black px-8 py-3 hover:bg-white/90 transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-12">Mes commandes</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl mb-2">Commande #{order.id}</h2>
                <p className="text-sm text-white/60">
                  Passée le {new Date(order.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="text-lg">{getStatusText(order.status)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-white/5"
                  />
                  <div className="flex-1">
                    <p className="mb-1">{item.name}</p>
                    <p className="text-sm text-white/60">
                      Quantité: {item.quantity} • {item.price}€
                    </p>
                  </div>
                  <p>{item.price * item.quantity}€</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-white/10">
              <div className="text-sm text-white/60 mb-4 md:mb-0">
                <p>Livraison à:</p>
                <p>
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.postalCode} {order.shippingInfo.city}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-white/60 mb-2">Total</p>
                <p className="text-2xl">{order.total}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
