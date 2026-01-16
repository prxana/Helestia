import { useState } from 'react';
import { Send, Sparkles, Download, Upload, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

export function Customization() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant IA pour créer des designs de toiles horloges personnalisées. Décrivez-moi le style que vous souhaitez et je générerai une image pour vous.',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // État du formulaire de devis
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImageForQuote, setGeneratedImageForQuote] = useState<string | null>(null);

  // Simulation de génération d'image par IA
  const generateImage = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simuler un délai de génération
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock : utiliser une image Unsplash basée sur le prompt
    const mockImages = [
      'https://images.unsplash.com/photo-1695551595447-d48a5e184ea5?w=800',
      'https://images.unsplash.com/photo-1621341104121-d610c0dc4228?w=800',
      'https://images.unsplash.com/photo-1649829658924-448d6522436e?w=800',
      'https://images.unsplash.com/photo-1655339998457-2609fc241495?w=800',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    
    setIsGenerating(false);
    return randomImage;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Générer une image basée sur le prompt
    const imageUrl = await generateImage(inputMessage);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Voici le design généré selon votre description. Vous pouvez le télécharger et l\'ajouter à votre devis !',
      imageUrl,
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleDownloadImage = (imageUrl: string) => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'design-personnalise.jpg';
    link.click();
  };

  const handleAddToQuote = (imageUrl: string) => {
    setGeneratedImageForQuote(imageUrl);
    // Scroll vers le formulaire
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de soumission
    alert('Devis soumis avec succès ! Nous vous contacterons sous 48h.');
    
    // Réinitialiser le formulaire
    setQuoteForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
    setUploadedImage(null);
    setGeneratedImageForQuote(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-4">PERSONNALISATION</h1>
        <p className="text-white/60 text-lg max-w-3xl">
          Créez votre toile horloge unique en 3 étapes : générez des designs avec notre IA, téléchargez l'image qui vous convient ou utilisez votre propre image, puis soumettez votre devis personnalisé.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Chatbox IA */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl">ASSISTANT IA</h2>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Décrivez votre style idéal et l'IA générera des propositions. Téléchargez l'image qui vous plaît ou ajoutez-la directement au devis.
            </p>

            {/* Zone de messages */}
            <div className="h-[500px] overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm mb-2">{message.content}</p>
                    {message.imageUrl && (
                      <div className="mt-3 space-y-3">
                        <img
                          src={message.imageUrl}
                          alt="Generated design"
                          className="w-full rounded-lg"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                            onClick={() => handleDownloadImage(message.imageUrl!)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-white text-black hover:bg-white/90"
                            onClick={() => handleAddToQuote(message.imageUrl!)}
                          >
                            Ajouter au devis
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <p className="text-sm">Génération en cours...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input de message */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Décrivez votre design idéal..."
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                disabled={isGenerating}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
                className="bg-white text-black hover:bg-white/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Section Formulaire de Devis */}
        <div id="quote-form" className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl mb-6">FORMULAIRE DE DEVIS</h2>

            <form onSubmit={handleSubmitQuote} className="space-y-6">
              {/* Images */}
              <div className="space-y-4">
                {generatedImageForQuote && (
                  <div className="relative">
                    <Label className="text-white/80 mb-2 block">
                      Image générée par IA
                    </Label>
                    <div className="relative">
                      <img
                        src={generatedImageForQuote}
                        alt="Generated"
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setGeneratedImageForQuote(null)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-2 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="image-upload" className="text-white/80 mb-2 block">
                    Téléchargez votre image
                  </Label>
                  <p className="text-xs text-white/50 mb-3">
                    Uploadez l'image générée par l'IA que vous avez téléchargée, ou votre propre image depuis votre ordinateur
                  </p>
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-2 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer hover:border-white/40 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-white/40 mb-2" />
                      <p className="text-sm text-white/60">
                        Cliquez pour télécharger une image
                      </p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Coordonnées */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white/80 mb-2 block">
                    Prénom *
                  </Label>
                  <Input
                    id="firstName"
                    value={quoteForm.firstName}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, firstName: e.target.value })
                    }
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white/80 mb-2 block">
                    Nom *
                  </Label>
                  <Input
                    id="lastName"
                    value={quoteForm.lastName}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, lastName: e.target.value })
                    }
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white/80 mb-2 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={quoteForm.email}
                  onChange={(e) =>
                    setQuoteForm({ ...quoteForm, email: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white/80 mb-2 block">
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={quoteForm.phone}
                  onChange={(e) =>
                    setQuoteForm({ ...quoteForm, phone: e.target.value })
                  }
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white/80 mb-2 block">
                  Message / Détails de votre demande *
                </Label>
                <Textarea
                  id="message"
                  value={quoteForm.message}
                  onChange={(e) =>
                    setQuoteForm({ ...quoteForm, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  placeholder="Décrivez les dimensions souhaitées, les couleurs, les détails techniques..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90"
                disabled={
                  !quoteForm.firstName ||
                  !quoteForm.lastName ||
                  !quoteForm.email ||
                  !quoteForm.phone ||
                  !quoteForm.message
                }
              >
                Soumettre le Devis
              </Button>

              <p className="text-xs text-white/40 text-center">
                * Champs obligatoires. Nous vous répondrons sous 48h.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}