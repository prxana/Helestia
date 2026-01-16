import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b border-[#fffaf2]/10 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl tracking-wider" style={{ fontFamily: 'Avenir, sans-serif' }}>
            HELESTIA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#fffaf2]/70 transition-colors">
              Accueil
            </Link>
            <Link to="/produits" className="hover:text-[#fffaf2]/70 transition-colors">
              Produits
            </Link>
            <Link to="/personnalisation" className="hover:text-[#fffaf2]/70 transition-colors">
              Personnalisation
            </Link>
            <Link to="/contact" className="hover:text-[#fffaf2]/70 transition-colors">
              Contact
            </Link>
            <Link to="/profil" className="hover:text-[#fffaf2]/70 transition-colors">
              <User className="w-6 h-6" />
            </Link>
            <Link to="/panier" className="relative hover:text-[#fffaf2]/70 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fffaf2] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/produits"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              to="/personnalisation"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Personnalisation
            </Link>
            <Link
              to="/contact"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/profil"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-6 h-6" />
            </Link>
            <Link
              to="/panier"
              className="block hover:text-[#fffaf2]/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Panier ({cartItemsCount})
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}