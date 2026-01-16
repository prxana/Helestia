import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#fffaf2]/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl tracking-wider mb-4">
              HELESTIA
            </h3>
            <p className="text-[#fffaf2]/60 text-sm">
              Toiles horloges texturées minimalistes pour
              sublimer votre intérieur.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/produits"
                  className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/profil"
                  className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-[#fffaf2]/60">
              <li>
                Livraison 7 - 14 jours (pour nos
                collections){" "}
              </li>
              <li>Paiement sécurisé</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fffaf2]/60 hover:text-[#fffaf2] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#fffaf2]/10 text-center text-sm text-[#fffaf2]/60">
          <p>&copy; 2025 HELESTIA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}