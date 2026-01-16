import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { Contact } from './pages/Contact';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Customization } from './pages/Customization';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-[#fffaf2] flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produits" element={<Products />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/paiement" element={<Checkout />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/personnalisation" element={<Customization />} />
              <Route path="/confirmation/:orderId" element={<OrderConfirmation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}