import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
const [userData, setUserData] = useState({
    uid: 1,
    nickname: 'Guest',
    email: 'guest@rockstar.com',
    hwid: 'HWID-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
    subscription: 'Нет подписки',
    subscriptionEnd: null,
    isAdmin: false,
    role: 'Пользователь'
  });

  const [features, setFeatures] = useState([
    { id: 1, title: 'Rockstar Premium', description: 'Полный набор функций для доминирования', image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=300&fit=crop', premium: true },
    { id: 2, title: 'Rockstar Combat', description: 'Расширенные боевые возможности', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop', premium: true },
    { id: 3, title: 'Rockstar ESP', description: 'Визуализация игроков и предметов', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop', premium: false },
    { id: 4, title: 'Rockstar Aimbot', description: 'Точность на максимум', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', premium: true }
  ]);

  const [promocodes, setPromocodes] = useState([
    { id: 1, code: 'ROCKSTAR50', discount: 50, uses: 23, maxUses: 100, active: true },
    { id: 2, code: 'PREMIUM25', discount: 25, uses: 87, maxUses: 500, active: true },
    { id: 3, code: 'WEZXE100', discount: 100, uses: 1, maxUses: 10, active: true }
  ]);

  const [activationKeys, setActivationKeys] = useState([
    { id: 1, key: 'RST-7D-A1B2C3D4E5', duration: 7, plan: '7 дней', used: false, createdAt: '2024-01-15' },
    { id: 2, key: 'RST-30D-F6G7H8I9J0', duration: 30, plan: '30 дней', used: false, createdAt: '2024-01-15' },
    { id: 3, key: 'RST-LIFE-K1L2M3N4O5', duration: 999999, plan: 'Навсегда', used: false, createdAt: '2024-01-15' },
    { id: 4, key: 'RST-7D-P6Q7R8S9T0', duration: 7, plan: '7 дней', used: true, createdAt: '2024-01-14' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, nickname: 'wezxe', email: 'wezxe@rockstar.com', password: '1234', role: 'Администратор', subscription: 'Навсегда' },
    { id: 2, nickname: 'Player2', email: 'player2@rockstar.com', password: 'pass123', role: 'Пользователь', subscription: 'Premium' },
    { id: 3, nickname: 'Player3', email: 'player3@rockstar.com', password: 'pass123', role: 'Тестер', subscription: 'Бесплатно' },
    { id: 4, nickname: 'YouTuber1', email: 'youtuber@rockstar.com', password: 'pass123', role: 'Ютубер', subscription: 'Навсегда' }
  ]);

  const [showAddFeature, setShowAddFeature] = useState(false);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [showGenerateKey, setShowGenerateKey] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newFeature, setNewFeature] = useState({ title: '', description: '', premium: false });
  const [newPromo, setNewPromo] = useState({ code: '', discount: 0, maxUses: 0 });
  const [keyDuration, setKeyDuration] = useState<7 | 30 | 999999>(7);
  const [activationKeyInput, setActivationKeyInput] = useState('');
  const [activationError, setActivationError] = useState('');
  const [activationSuccess, setActivationSuccess] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerNickname, setRegisterNickname] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const subscriptionPlans = [
    { id: 1, name: '7 дней', price: '199₽', duration: '7 дней', badge: 'Пробный' },
    { id: 2, name: '30 дней', price: '599₽', duration: '30 дней', badge: 'Популярный' },
    { id: 3, name: 'Навсегда', price: '1999₽', duration: 'Навсегда', badge: 'Premium' }
  ];

const visualPacks = features;

const handleLogin = () => {
    setLoginError('');
    
    if (authMode === 'register') {
      if (!registerNickname || !registerEmail || !registerPassword) {
        setLoginError('Заполните все поля');
        return;
      }
      const newUser = {
        id: users.length + 1,
        nickname: registerNickname,
        email: registerEmail,
        password: registerPassword,
        role: 'Пользователь',
        subscription: 'Нет подписки'
      };
      setUsers([...users, newUser]);
      setUserData({
        uid: newUser.id,
        nickname: newUser.nickname,
        email: newUser.email,
        hwid: 'HWID-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
        subscription: 'Нет подписки',
        subscriptionEnd: null,
        isAdmin: false,
        role: 'Пользователь'
      });
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setActiveTab('profile');
      setRegisterNickname('');
      setRegisterEmail('');
      setRegisterPassword('');
      return;
    }
    
    const user = users.find(u => u.email === loginEmail || u.nickname === loginEmail);
    
    if (!user) {
      setLoginError('Нет такого аккаунта! Зарегистрируйтесь.');
      return;
    }
    
    if (user.password !== loginPassword) {
      setLoginError('Неверный пароль!');
      return;
    }
    
    const isAdmin = user.id === 1;
    setUserData({
      uid: user.id,
      nickname: user.nickname,
      email: user.email,
      hwid: 'HWID-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      subscription: user.subscription,
      subscriptionEnd: isAdmin ? '2099-12-31' : null,
      isAdmin: isAdmin,
      role: user.role
    });
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setActiveTab('profile');
    setLoginEmail('');
    setLoginPassword('');
  };

  const generateKey = (duration: 7 | 30 | 999999) => {
    const planNames = { 7: '7 дней', 30: '30 дней', 999999: 'Навсегда' };
    const prefix = duration === 7 ? '7D' : duration === 30 ? '30D' : 'LIFE';
    const randomPart = Math.random().toString(36).substr(2, 10).toUpperCase();
    const newKey = {
      id: activationKeys.length + 1,
      key: `RST-${prefix}-${randomPart}`,
      duration: duration,
      plan: planNames[duration],
      used: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setActivationKeys([...activationKeys, newKey]);
    return newKey.key;
  };

  const deleteFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const addFeature = () => {
    if (!newFeature.title || !newFeature.description) return;
    const feature = {
      id: features.length + 1,
      ...newFeature,
      image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=300&fit=crop'
    };
    setFeatures([...features, feature]);
    setNewFeature({ title: '', description: '', premium: false });
    setShowAddFeature(false);
  };

  const deletePromo = (id: number) => {
    setPromocodes(promocodes.filter(p => p.id !== id));
  };

  const addPromo = () => {
    if (!newPromo.code || newPromo.discount <= 0) return;
    const promo = {
      id: promocodes.length + 1,
      ...newPromo,
      uses: 0,
      active: true
    };
    setPromocodes([...promocodes, promo]);
    setNewPromo({ code: '', discount: 0, maxUses: 0 });
    setShowAddPromo(false);
  };

  const updateUserRole = (userId: number, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setShowEditRole(false);
    setSelectedUser(null);
  };

  const activateKey = () => {
    setActivationError('');
    setActivationSuccess('');
    
    if (!activationKeyInput.trim()) {
      setActivationError('Введите ключ активации');
      return;
    }
    
    const keyIndex = activationKeys.findIndex(k => k.key.toUpperCase() === activationKeyInput.trim().toUpperCase() && !k.used);
    
    if (keyIndex === -1) {
      setActivationError('Ключ недействителен или уже использован');
      return;
    }
    
    const key = activationKeys[keyIndex];
    const updatedKeys = [...activationKeys];
    updatedKeys[keyIndex] = { ...key, used: true };
    setActivationKeys(updatedKeys);
    
    const newEndDate = new Date();
    if (key.duration === 999999) {
      newEndDate.setFullYear(2099);
    } else {
      newEndDate.setDate(newEndDate.getDate() + key.duration);
    }
    
    const newUserData = {
      ...userData,
      subscription: key.plan,
      subscriptionEnd: newEndDate.toISOString().split('T')[0]
    };
    
    setUserData(newUserData);
    
    setUsers(users.map(u => 
      u.id === userData.uid 
        ? { ...u, subscription: key.plan }
        : u
    ));
    
    setActivationSuccess(`Подписка "${key.plan}" успешно активирована!`);
    setActivationKeyInput('');
  };

const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      uid: userData.uid + 1,
      nickname: 'Guest',
      email: 'guest@rockstar.com',
      hwid: 'HWID-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      subscription: 'Нет подписки',
      subscriptionEnd: null,
      isAdmin: false,
      role: 'Пользователь'
    });
    setActiveTab('home');
  };

  const handlePurchase = (planId: number) => {
    setSelectedPlan(planId);
    setActiveTab('checkout');
  };

  const applyPromoCode = () => {
    setPromoError('');
    setPromoDiscount(0);
    
    const validPromoCodes: {[key: string]: number} = {
      'ROCKSTAR50': 50,
      'PREMIUM25': 25,
      'WEZXE100': 100
    };
    
    const discount = validPromoCodes[promoCode.toUpperCase()];
    
    if (discount) {
      setPromoDiscount(discount);
    } else {
      setPromoError('Неверный промокод');
    }
  };

  const calculateFinalPrice = (price: string) => {
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
    const discount = (numPrice * promoDiscount) / 100;
    return numPrice - discount;
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-green-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
<div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-black" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                ROCKSTAR CLIENT
              </h1>
            </div>
            
<nav className="hidden md:flex gap-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`text-sm font-medium transition-colors ${activeTab === 'features' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
              >
                Функции
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className={`text-sm font-medium transition-colors ${activeTab === 'pricing' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
              >
                Цены
              </button>
              {isLoggedIn && (
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'profile' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
                >
                  Профиль
                </button>
              )}
{userData.isAdmin && isLoggedIn && (
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'admin' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
                >
                  Админ
                </button>
              )}
            </nav>

            <div className="flex gap-3">
              {!isLoggedIn ? (
                <>
                  <Button 
                    onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                    variant="outline" 
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    Войти
                  </Button>
                  <Button 
                    onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
                    className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                  >
                    Регистрация
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Выйти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
{activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 mb-4 border border-green-500/30">
                ⚡ Непобедимый чит-клиент
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                ROCKSTAR<br />CLIENT
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Полный контроль над игрой. Мощные функции для доминирования на любом сервере.
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                  onClick={() => setActiveTab('features')}
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Смотреть функции
                </Button>
                <Button size="lg" variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10" onClick={() => setActiveTab('pricing')}>
                  Узнать цены
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 border border-green-500/30">
                  <Icon name="Zap" size={24} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Мгновенный доступ</h3>
                <p className="text-gray-400">Получи клиент сразу после оплаты подписки</p>
              </Card>
              
              <Card className="p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 border-cyan-500/30 bg-gradient-to-br from-gray-900 to-black">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/30">
                  <Icon name="Shield" size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Анти-бан защита</h3>
                <p className="text-gray-400">Продвинутая система обхода античитов</p>
              </Card>
              
              <Card className="p-6 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 border border-green-500/30">
                  <Icon name="Rocket" size={24} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Регулярные обновления</h3>
                <p className="text-gray-400">Новые функции каждую неделю бесплатно</p>
              </Card>
            </section>
          </div>
        )}

{activeTab === 'features' && (
          <div className="space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Функции клиента</h2>
              <p className="text-gray-400 text-lg">Все что нужно для победы</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visualPacks.map((pack, index) => (
                <Card 
                  key={pack.id} 
                  className="overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2 border-green-500/30 group bg-gradient-to-br from-gray-900 to-black"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={pack.image} 
                      alt={pack.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 opacity-60"
                    />
                    {pack.premium && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-green-500 text-black">
                        <Icon name="Lock" size={12} className="mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white">{pack.title}</h3>
                    <p className="text-gray-400">{pack.description}</p>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold">
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

{activeTab === 'pricing' && (
          <div className="space-y-12 animate-scale-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Выбери свой план</h2>
              <p className="text-gray-400 text-lg">Доступ ко всем функциям Rockstar Client</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptionPlans.map((plan, index) => (
                <Card 
                  key={plan.id}
                  className={`p-8 relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    index === 1 ? 'border-2 border-green-500 shadow-xl shadow-green-500/20 bg-gradient-to-br from-gray-900 to-black' : 'border-green-500/30 bg-gradient-to-br from-gray-900 to-black hover:shadow-xl hover:shadow-green-500/10'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-green-500 text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                      ЛУЧШИЙ ВЫБОР
                    </div>
                  )}
                  <div className="space-y-6 pt-4">
                    <div>
                      <Badge className="mb-3 bg-green-500/20 text-green-400 hover:bg-green-500/20 border border-green-500/30">
                        {plan.badge}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        {plan.price}
                      </div>
                      <p className="text-gray-400">{plan.duration} доступа</p>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-400" />
                        <span className="text-sm text-gray-300">Все функции</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-400" />
                        <span className="text-sm text-gray-300">Анти-бан защита</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-400" />
                        <span className="text-sm text-gray-300">Новые обновления</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-400" />
                        <span className="text-sm text-gray-300">Поддержка 24/7</span>
                      </li>
                    </ul>
<Button 
                      onClick={() => handlePurchase(plan.id)}
                      className={`w-full ${
                        index === 1 
                          ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      Оформить подписку
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && isLoggedIn && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                <Icon name="User" size={24} className="text-black" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Личный кабинет</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="CreditCard" size={20} className="text-green-400" />
                    <h3 className="text-lg font-bold text-white">Подписка</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <span className="text-gray-400">Статус</span>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                        {userData.subscription}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Истекает</span>
                      <span className="text-white font-mono">{userData.subscriptionEnd}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-gray-900 to-black">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="User" size={20} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Профиль</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Никнейм</span>
                      <span className="text-white font-mono">{userData.nickname}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Почта</span>
                      <span className="text-white font-mono text-sm">{userData.email}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black md:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Shield" size={20} className="text-green-400" />
                    <h3 className="text-lg font-bold text-white">Идентификаторы</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">UID</span>
                      <span className="text-green-400 font-mono font-bold">{userData.uid}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">HWID</span>
                      <span className="text-cyan-400 font-mono font-bold text-sm">{userData.hwid}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-gray-900 to-black">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Key" size={20} className="text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Активировать ключ</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      value={activationKeyInput}
                      onChange={(e) => setActivationKeyInput(e.target.value.toUpperCase())}
                      placeholder="RST-7D-XXXXX или RST-30D-XXXXX"
                      className="bg-gray-800/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                    />
                    <Button
                      onClick={activateKey}
                      className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                    >
                      <Icon name="Check" size={18} className="mr-2" />
                      Активировать
                    </Button>
                  </div>
                  {activationError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{activationError}</p>
                    </div>
                  )}
                  {activationSuccess && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">{activationSuccess}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Скачать клиент</h3>
                  <p className="text-gray-400 text-sm">Последняя версия Rockstar Client v2.5.1</p>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'checkout' && selectedPlan && (
          <div className="space-y-8 animate-scale-in max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('pricing')}
                className="text-gray-400 hover:text-green-400"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
            </div>

            <Card className="p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-6">
                Оформление подписки
              </h2>

              {(() => {
                const plan = subscriptionPlans.find(p => p.id === selectedPlan);
                if (!plan) return null;
                
                const originalPrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
                const finalPrice = calculateFinalPrice(plan.price);

                return (
                  <div className="space-y-6">
                    <div className="p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                          <p className="text-gray-400">{plan.duration} доступа</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                          {plan.badge}
                        </Badge>
                      </div>
                      
                      <div className="flex items-baseline gap-3">
                        {promoDiscount > 0 && (
                          <span className="text-2xl text-gray-500 line-through">{originalPrice}₽</span>
                        )}
                        <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                          {finalPrice}₽
                        </span>
                        {promoDiscount > 0 && (
                          <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            -{promoDiscount}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Промокод</h3>
                      <div className="flex gap-3">
                        <Input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Введи промокод"
                          className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                        />
                        <Button
                          onClick={applyPromoCode}
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                        >
                          Применить
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-red-400 text-sm">{promoError}</p>
                      )}
                      {promoDiscount > 0 && (
                        <p className="text-green-400 text-sm">✅ Промокод применён! Скидка {promoDiscount}%</p>
                      )}
                      
                      <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <p className="text-sm text-cyan-300 font-semibold mb-2">💡 Доступные промокоды:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li><code className="text-green-400">ROCKSTAR50</code> - скидка 50%</li>
                          <li><code className="text-green-400">PREMIUM25</code> - скидка 25%</li>
                          <li><code className="text-green-400">WEZXE100</code> - скидка 100% (для wezxe)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Способ оплаты</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="border-green-500/30 text-white hover:bg-green-500/10 h-16">
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Карта
                        </Button>
                        <Button variant="outline" className="border-green-500/30 text-white hover:bg-green-500/10 h-16">
                          <Icon name="Wallet" size={20} className="mr-2" />
                          Qiwi
                        </Button>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold h-14 text-lg"
                    >
                      <Icon name="Lock" size={20} className="mr-2" />
                      Оплатить {finalPrice}₽
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку оплаты, вы соглашаетесь с условиями использования
                    </p>
                  </div>
                );
              })()}
            </Card>
          </div>
        )}

{activeTab === 'admin' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-black" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Админ-панель</h2>
            </div>

<Tabs defaultValue="users" className="space-y-6">
<TabsList className="bg-gray-900 border border-green-500/30">
                <TabsTrigger value="users" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Пользователи</TabsTrigger>
                <TabsTrigger value="keys" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Ключи</TabsTrigger>
                <TabsTrigger value="promocodes" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Промокоды</TabsTrigger>
                <TabsTrigger value="visuals" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Функции</TabsTrigger>
              </TabsList>

<TabsContent value="users" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Управление пользователями</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Всего: {users.length} пользователей
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {users.map((user, index) => {
                      const roleColors = {
                        'Администратор': 'green',
                        'Тестер': 'yellow',
                        'Ютубер': 'purple',
                        'Пользователь': 'gray'
                      };
                      const color = roleColors[user.role as keyof typeof roleColors] || 'gray';
                      
                      return (
                        <div key={user.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                          index === 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-gray-800/50 border-gray-700'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-${color}-500/20 rounded-full flex items-center justify-center border border-${color}-500/30`}>
                              <Icon name={index === 0 ? "Crown" : "User"} size={20} className={`text-${color}-400`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-white">{user.nickname}</p>
                                <Badge className="bg-gray-700 text-gray-300 text-xs">UID: {user.id}</Badge>
                              </div>
                              <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}>
                              {user.role}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => { setSelectedUser(user); setShowEditRole(true); }}
                              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                            >
                              <Icon name="Edit" size={16} />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="keys" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Ключи активации</h3>
                    <Button 
                      onClick={() => setShowGenerateKey(true)}
                      className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                    >
                      <Icon name="Key" size={18} className="mr-2" />
                      Генерировать ключ
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {activationKeys.map(key => (
                      <div key={key.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                        key.used ? 'bg-gray-800/30 border-gray-700' : 'bg-green-500/10 border-green-500/20'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                            key.used ? 'bg-gray-700 border-gray-600' : 'bg-green-500/20 border-green-500/30'
                          }`}>
                            <Icon name="Key" size={24} className={key.used ? 'text-gray-400' : 'text-green-400'} />
                          </div>
                          <div>
                            <p className="font-mono font-bold text-white">{key.key}</p>
                            <p className="text-sm text-gray-400">{key.plan} • Создан: {key.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {key.used ? (
                            <Badge variant="outline" className="border-gray-600 text-gray-400">Использован</Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Активен</Badge>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(key.key)}
                            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Выдача подписок</h3>
                    <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Новая подписка
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {subscriptionPlans.map(plan => (
                      <Card key={plan.id} className="p-4 border-green-500/30 bg-gray-800/50">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white">{plan.name}</h4>
                            <Badge variant="outline" className="border-green-500/30 text-green-400">{plan.price}</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10">
                            Выдать
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

<TabsContent value="promocodes" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Управление промокодами</h3>
                    <Button 
                      onClick={() => setShowAddPromo(true)}
                      className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Создать промокод
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {promocodes.map((promo, index) => {
                      const colors = ['green', 'cyan', 'yellow'];
                      const color = colors[index % colors.length];
                      
                      return (
                        <div key={promo.id} className={`flex items-center justify-between p-4 bg-${color}-500/10 rounded-lg border border-${color}-500/20`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-${color}-500/20 rounded-lg flex items-center justify-center border border-${color}-500/30`}>
                              <Icon name={promo.discount === 100 ? "Crown" : "Ticket"} size={24} className={`text-${color}-400`} />
                            </div>
                            <div>
                              <p className="font-bold text-white text-lg">{promo.code}</p>
                              <p className="text-sm text-gray-400">Скидка {promo.discount}% • Использовано: {promo.uses}/{promo.maxUses}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}>
                              {promo.discount === 100 ? 'VIP' : 'Активен'}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deletePromo(promo.id)}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

<TabsContent value="visuals" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Управление функциями</h3>
                    <Button 
                      onClick={() => setShowAddFeature(true)}
                      className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
                    >
                      <Icon name="Upload" size={18} className="mr-2" />
                      Добавить функцию
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {features.map(pack => (
                      <div key={pack.id} className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-4">
                          <img src={pack.image} alt={pack.title} className="w-16 h-16 rounded-lg object-cover opacity-60" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-white">{pack.title}</p>
                              {pack.premium && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs">
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{pack.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteFeature(pack.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {showGenerateKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Генерация ключа
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowGenerateKey(false)} className="text-gray-400">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2">Выберите план</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    { duration: 7 as 7 | 30 | 999999, label: '7 дней' },
                    { duration: 30 as 7 | 30 | 999999, label: '30 дней' },
                    { duration: 999999 as 7 | 30 | 999999, label: 'Навсегда' }
                  ].map(plan => (
                    <Button
                      key={plan.duration}
                      variant={keyDuration === plan.duration ? 'default' : 'outline'}
                      onClick={() => setKeyDuration(plan.duration)}
                      className={keyDuration === plan.duration 
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-black' 
                        : 'border-green-500/50 text-green-400'}
                    >
                      {plan.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => {
                  const key = generateKey(keyDuration);
                  navigator.clipboard.writeText(key);
                  setShowGenerateKey(false);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
              >
                <Icon name="Key" size={18} className="mr-2" />
                Сгенерировать ключ
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showAddFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Добавить функцию
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddFeature(false)} className="text-gray-400">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Название</Label>
                <Input
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                  className="bg-gray-800/50 border-green-500/30 text-white mt-2"
                  placeholder="Rockstar Ultimate"
                />
              </div>
              <div>
                <Label className="text-white">Описание</Label>
                <Input
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  className="bg-gray-800/50 border-green-500/30 text-white mt-2"
                  placeholder="Описание функции"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newFeature.premium}
                  onChange={(e) => setNewFeature({...newFeature, premium: e.target.checked})}
                  className="w-4 h-4"
                />
                <Label className="text-white">Premium функция</Label>
              </div>
              <Button
                onClick={addFeature}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
              >
                Добавить
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showAddPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Создать промокод
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddPromo(false)} className="text-gray-400">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Код</Label>
                <Input
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})}
                  className="bg-gray-800/50 border-green-500/30 text-white mt-2"
                  placeholder="PROMO2024"
                />
              </div>
              <div>
                <Label className="text-white">Скидка (%)</Label>
                <Input
                  type="number"
                  value={newPromo.discount || ''}
                  onChange={(e) => setNewPromo({...newPromo, discount: parseInt(e.target.value) || 0})}
                  className="bg-gray-800/50 border-green-500/30 text-white mt-2"
                  placeholder="50"
                />
              </div>
              <div>
                <Label className="text-white">Макс. использований</Label>
                <Input
                  type="number"
                  value={newPromo.maxUses || ''}
                  onChange={(e) => setNewPromo({...newPromo, maxUses: parseInt(e.target.value) || 0})}
                  className="bg-gray-800/50 border-green-500/30 text-white mt-2"
                  placeholder="100"
                />
              </div>
              <Button
                onClick={addPromo}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
              >
                Создать
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showEditRole && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Изменить роль
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowEditRole(false)} className="text-gray-400">
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Пользователь: {selectedUser.nickname}</Label>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {['Администратор', 'Тестер', 'Ютубер', 'Пользователь'].map(role => (
                    <Button
                      key={role}
                      variant={selectedUser.role === role ? 'default' : 'outline'}
                      onClick={() => updateUserRole(selectedUser.id, role)}
                      className={selectedUser.role === role
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-black'
                        : 'border-green-500/50 text-green-400'}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-md mx-4 p-8 border-green-500/30 bg-gradient-to-br from-gray-900 to-black animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {authMode === 'login' ? 'Вход' : 'Регистрация'}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-gray-300">Никнейм</Label>
                  <Input 
                    id="nickname"
                    value={registerNickname}
                    onChange={(e) => setRegisterNickname(e.target.value)}
                    placeholder="Введи свой никнейм"
                    className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  {authMode === 'login' ? 'Email или никнейм' : 'Email'}
                </Label>
                <Input 
                  id="email" 
                  type={authMode === 'login' ? 'text' : 'email'}
                  value={authMode === 'login' ? loginEmail : registerEmail}
                  onChange={(e) => authMode === 'login' ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                  placeholder={authMode === 'login' ? 'wezxe или email@rockstar.com' : 'твой@email.com'}
                  className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Пароль</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={authMode === 'login' ? loginPassword : registerPassword}
                  onChange={(e) => authMode === 'login' ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
              >
                {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>

              <div className="text-center text-sm text-gray-400">
                {authMode === 'login' ? (
                  <p>
                    Нет аккаунта?{' '}
                    <button 
                      onClick={() => setAuthMode('register')}
                      className="text-green-400 hover:text-green-300 font-semibold"
                    >
                      Зарегистрируйся
                    </button>
                  </p>
                ) : (
                  <p>
                    Уже есть аккаунт?{' '}
                    <button 
                      onClick={() => setAuthMode('login')}
                      className="text-green-400 hover:text-green-300 font-semibold"
                    >
                      Войди
                    </button>
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white mt-20 border-t border-green-500/20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-black" />
                </div>
                <h3 className="text-xl font-bold">ROCKSTAR</h3>
              </div>
              <p className="text-gray-400">Самый мощный чит-клиент</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-white">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActiveTab('features')} className="hover:text-green-400 transition-colors">Функции</button></li>
                <li><button onClick={() => setActiveTab('pricing')} className="hover:text-green-400 transition-colors">Цены</button></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-white">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Discord</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-white">Социальные сети</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-colors">
                  <Icon name="MessageCircle" size={20} className="text-green-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-colors">
                  <Icon name="Youtube" size={20} className="text-green-400" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 ROCKSTAR CLIENT. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;