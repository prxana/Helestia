import { useState, useEffect } from 'react';
import { User, Package, LogOut, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  // Formulaires
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      loadOrders();
    }
  }, []);

  const loadOrders = () => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de connexion
    const userData = {
      email: loginForm.email,
      name: loginForm.email.split('@')[0],
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    loadOrders();
    
    // Réinitialiser le formulaire
    setLoginForm({ email: '', password: '' });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Simulation d'inscription
    const userData = {
      email: signUpForm.email,
      name: signUpForm.name,
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Réinitialiser le formulaire
    setSignUpForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleEditClick = () => {
    if (user) {
      setEditForm({ name: user.name, email: user.email });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (user) {
      const updatedUser = { ...user, ...editForm };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({ name: '', email: '' });
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'En attente',
      processing: 'En cours de traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'text-yellow-400',
      processing: 'text-blue-400',
      shipped: 'text-purple-400',
      delivered: 'text-green-400',
    };
    return colorMap[status];
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#fffaf2]/5 border border-[#fffaf2]/10 rounded-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-[#fffaf2]/20 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-3xl text-center mb-8">
            {isSignUp ? 'CRÉER UN COMPTE' : 'SE CONNECTER'}
          </h1>

          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-[#fffaf2]/80 mb-2 block">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={signUpForm.name}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, name: e.target.value })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#fffaf2]/80 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, email: e.target.value })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#fffaf2]/80 mb-2 block">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={signUpForm.password}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, password: e.target.value })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-[#fffaf2]/80 mb-2 block">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fffaf2] text-black hover:bg-[#fffaf2]/90"
              >
                Créer mon compte
              </Button>

              <p className="text-center text-[#fffaf2]/60 text-sm">
                Vous avez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-[#fffaf2] underline hover:text-[#fffaf2]/80"
                >
                  Se connecter
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="login-email" className="text-[#fffaf2]/80 mb-2 block">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-[#fffaf2]/80 mb-2 block">
                  Mot de passe
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  required
                  className="bg-[#fffaf2]/5 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fffaf2] text-black hover:bg-[#fffaf2]/90"
              >
                Se connecter
              </Button>

              <p className="text-center text-[#fffaf2]/60 text-sm">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-[#fffaf2] underline hover:text-[#fffaf2]/80"
                >
                  Créer un compte
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl mb-2">MON PROFIL</h1>
          <p className="text-[#fffaf2]/60">Bienvenue, {user?.name}</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-[#fffaf2]/40 bg-[#fffaf2]/10 text-[#fffaf2] hover:bg-[#fffaf2]/20 hover:border-[#fffaf2]/60"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-8 bg-[#fffaf2]/5 border border-[#fffaf2]/10">
          <TabsTrigger 
            value="orders" 
            className="text-[#fffaf2]/80 data-[state=active]:bg-[#fffaf2] data-[state=active]:text-black hover:text-[#fffaf2]"
          >
            <Package className="w-4 h-4 mr-2" />
            Mes Commandes
          </TabsTrigger>
          <TabsTrigger 
            value="account" 
            className="text-[#fffaf2]/80 data-[state=active]:bg-[#fffaf2] data-[state=active]:text-black hover:text-[#fffaf2]"
          >
            <User className="w-4 h-4 mr-2" />
            Informations du compte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto mb-4 text-[#fffaf2]/40" />
              <h2 className="text-2xl mb-2">Aucune commande</h2>
              <p className="text-[#fffaf2]/60 mb-8">
                Vous n'avez pas encore passé de commande.
              </p>
              <Button
                onClick={() => (window.location.href = '/produits')}
                className="bg-[#fffaf2] text-black hover:bg-[#fffaf2]/90"
              >
                Découvrir nos produits
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#fffaf2]/5 border border-[#fffaf2]/10 rounded-lg p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-xl mb-1">Commande #{order.id}</h3>
                      <p className="text-[#fffaf2]/60 text-sm">{order.date}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className={`text-sm ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-lg">{order.total}€</span>
                    </div>
                  </div>

                  <div className="border-t border-[#fffaf2]/10 pt-4 mt-4">
                    <h4 className="text-sm text-[#fffaf2]/60 mb-3">Articles commandés</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-[#fffaf2]/60">{item.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="account">
          <div className="bg-[#fffaf2]/5 border border-[#fffaf2]/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl">Informations personnelles</h2>
              {!isEditing && (
                <Button
                  onClick={handleEditClick}
                  className="bg-[#fffaf2] text-black hover:bg-[#fffaf2]/90"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifier mes infos
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="edit-name" className="text-[#fffaf2]/80 mb-2 block">
                    Nom
                  </Label>
                  <Input
                    id="edit-name"
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="bg-[#fffaf2]/10 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-email" className="text-[#fffaf2]/80 mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="bg-[#fffaf2]/10 border-[#fffaf2]/20 text-[#fffaf2] placeholder:text-[#fffaf2]/40"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-[#fffaf2] text-black hover:bg-[#fffaf2]/90"
                  >
                    Enregistrer
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    className="border-[#fffaf2]/40 bg-[#fffaf2]/10 text-[#fffaf2] hover:bg-[#fffaf2]/20 hover:border-[#fffaf2]/60"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label className="text-[#fffaf2]/80 mb-2 block">Nom</Label>
                  <div className="text-lg">{user?.name}</div>
                </div>

                <div>
                  <Label className="text-[#fffaf2]/80 mb-2 block">Email</Label>
                  <div className="text-lg">{user?.email}</div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}