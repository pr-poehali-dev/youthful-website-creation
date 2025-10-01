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
    isAdmin: false
  });

  const subscriptionPlans = [
    { id: 1, name: '7 дней', price: '199₽', duration: '7 дней', badge: 'Пробный' },
    { id: 2, name: '30 дней', price: '599₽', duration: '30 дней', badge: 'Популярный' },
    { id: 3, name: 'Навсегда', price: '1999₽', duration: 'Навсегда', badge: 'Premium' }
  ];

  const visualPacks = [
    {
      id: 1,
      title: 'Rockstar Premium',
      description: 'Полный набор функций для доминирования',
      image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=300&fit=crop',
      premium: true
    },
    {
      id: 2,
      title: 'Rockstar Combat',
      description: 'Расширенные боевые возможности',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      premium: true
    },
    {
      id: 3,
      title: 'Rockstar ESP',
      description: 'Визуализация игроков и предметов',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      premium: false
    },
    {
      id: 4,
      title: 'Rockstar Aimbot',
      description: 'Точность на максимум',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      premium: true
    }
  ];

const handleLogin = () => {
    const isAdminLogin = userData.uid === 1;
    setUserData({
      uid: userData.uid,
      nickname: isAdminLogin ? 'wezxe' : 'Player' + userData.uid,
      email: isAdminLogin ? 'wezxe@rockstar.com' : `player${userData.uid}@rockstar.com`,
      hwid: 'HWID-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      subscription: isAdminLogin ? 'Навсегда' : 'Нет подписки',
      subscriptionEnd: isAdminLogin ? '2099-12-31' : null,
      isAdmin: isAdminLogin
    });
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setActiveTab('profile');
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
      isAdmin: false
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
                <TabsTrigger value="subscriptions" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Подписки</TabsTrigger>
                <TabsTrigger value="promocodes" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Промокоды</TabsTrigger>
                <TabsTrigger value="visuals" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Функции</TabsTrigger>
              </TabsList>

<TabsContent value="users" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Управление пользователями</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Всего: 156 пользователей
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <Icon name="Crown" size={20} className="text-green-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">wezxe</p>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs">UID: 1</Badge>
                          </div>
                          <p className="text-sm text-gray-400">wezxe@rockstar.com</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Владелец</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                          <Icon name="User" size={20} className="text-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">Player2</p>
                            <Badge className="bg-gray-700 text-gray-300 text-xs">UID: 2</Badge>
                          </div>
                          <p className="text-sm text-gray-400">player2@rockstar.com</p>
                        </div>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Premium</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                          <Icon name="User" size={20} className="text-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">Player3</p>
                            <Badge className="bg-gray-700 text-gray-300 text-xs">UID: 3</Badge>
                          </div>
                          <p className="text-sm text-gray-400">player3@rockstar.com</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">Бесплатно</Badge>
                    </div>
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
                    <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Создать промокод
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                          <Icon name="Ticket" size={24} className="text-green-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">ROCKSTAR50</p>
                          <p className="text-sm text-gray-400">Скидка 50% • Использовано: 23/100</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Активен</Badge>
                        <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                          <Icon name="Ticket" size={24} className="text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">PREMIUM25</p>
                          <p className="text-sm text-gray-400">Скидка 25% • Использовано: 87/500</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Активен</Badge>
                        <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                          <Icon name="Crown" size={24} className="text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">WEZXE100</p>
                          <p className="text-sm text-gray-400">Скидка 100% • Использовано: 1/10</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">VIP</Badge>
                        <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="visuals" className="space-y-4">
                <Card className="p-6 border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Управление функциями</h3>
                    <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold">
                      <Icon name="Upload" size={18} className="mr-2" />
                      Добавить функцию
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {visualPacks.map(pack => (
                      <div key={pack.id} className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-4">
                          <img src={pack.image} alt={pack.title} className="w-16 h-16 rounded-lg object-cover opacity-60" />
                          <div>
                            <p className="font-semibold text-white">{pack.title}</p>
                            <p className="text-sm text-gray-400">{pack.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
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
                    placeholder="Введи свой никнейм"
                    className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="твой@email.com"
                  className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Пароль</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-green-500/30 text-white placeholder:text-gray-500"
                />
              </div>

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