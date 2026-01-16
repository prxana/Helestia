import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl mb-4">CONTACTEZ-NOUS</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Une question sur nos produits ? Besoin d'aide ? Notre équipe est là pour vous répondre.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-1">Email</h3>
                <p className="text-sm text-white/60">contact@helestia.fr</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-1">Téléphone</h3>
                <p className="text-sm text-white/60">06 38 43 84 48</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="mb-1">Adresse</h3>
                <p className="text-sm text-white/60">
                  55 rue du Lieutenant Baude
                  <br />
                  95270 Saint-Martin-du-Tertre
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl mb-8">ENVOYEZ-NOUS UN MESSAGE</h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <Send className="w-16 h-16 mx-auto mb-6 text-green-500" />
                <h3 className="text-2xl mb-4">Message envoyé !</h3>
                <p className="text-white/60">
                  Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
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
                  <label htmlFor="subject" className="block text-sm text-white/60 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  Envoyer le message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 p-6 border border-white/10 bg-white/5">
            <h3 className="mb-4">QUESTIONS FRÉQUENTES</h3>
            <div className="space-y-4 text-sm text-white/60">
              <p>
                <strong className="text-white">Délai de livraison :</strong> Pour les toiles des collections proposées, comptez environ 1 à 2 semaines ouvrées. Pour les toiles personnalisées, le délai est étudié lors de l'établissement du devis.
              </p>
              <p>
                <strong className="text-white">Retours :</strong> Nous acceptons les retours seulement en cas de produit endommagé lors de la livraison
              </p>
              <p>
                <strong className="text-white">Personnalisation :</strong> Demandez votre devis personnalisé à partir de la page personnalisation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}