import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin] = useState(false);

  const subscriptionPlans = [
    { id: 1, name: '7 дней', price: '199₽', duration: '7 дней', badge: 'Пробный' },
    { id: 2, name: '30 дней', price: '599₽', duration: '30 дней', badge: 'Популярный' },
    { id: 3, name: 'Навсегда', price: '1999₽', duration: 'Навсегда', badge: 'Premium' }
  ];

  const visualPacks = [
    {
      id: 1,
      title: 'Neon Dreams',
      description: 'Яркие неоновые текстуры для Minecraft',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      premium: true
    },
    {
      id: 2,
      title: 'Cyberpunk City',
      description: 'Футуристичный визуал в стиле киберпанк',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      premium: true
    },
    {
      id: 3,
      title: 'Pixel Art Pro',
      description: 'Классические пиксельные текстуры',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      premium: false
    },
    {
      id: 4,
      title: 'Retro Wave',
      description: 'Ретро стиль 80-х для твоего мира',
      image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=300&fit=crop',
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MC Visuals
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveTab('visuals')}
                className={`text-sm font-medium transition-colors ${activeTab === 'visuals' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Визуалы
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className={`text-sm font-medium transition-colors ${activeTab === 'pricing' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                Цены
              </button>
              {isAdmin && (
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'admin' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
                >
                  Админ
                </button>
              )}
            </nav>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Войти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                🎮 Новая коллекция визуалов
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Прокачай свой<br />Minecraft
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Эксклюзивные визуалы и текстуры для создания уникального игрового опыта
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setActiveTab('visuals')}
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Смотреть визуалы
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('pricing')}>
                  Узнать цены
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Мгновенный доступ</h3>
                <p className="text-gray-600">Получи визуалы сразу после оплаты подписки</p>
              </Card>
              
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-pink-100">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Crown" size={24} className="text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium качество</h3>
                <p className="text-gray-600">Все визуалы в HD качестве от топовых дизайнеров</p>
              </Card>
              
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Rocket" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Еженедельные обновления</h3>
                <p className="text-gray-600">Новые визуалы каждую неделю бесплатно</p>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'visuals' && (
          <div className="space-y-8 animate-slide-up">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Коллекция визуалов</h2>
              <p className="text-gray-600 text-lg">Выбирай визуалы для своего мира</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualPacks.map((pack, index) => (
                <Card 
                  key={pack.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-purple-100 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={pack.image} 
                      alt={pack.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {pack.premium && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600">
                        <Icon name="Lock" size={12} className="mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold">{pack.title}</h3>
                    <p className="text-gray-600">{pack.description}</p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
              <h2 className="text-4xl md:text-5xl font-bold">Выбери свой план</h2>
              <p className="text-gray-600 text-lg">Доступ ко всем визуалам по подписке</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptionPlans.map((plan, index) => (
                <Card 
                  key={plan.id}
                  className={`p-8 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    index === 1 ? 'border-2 border-purple-500 shadow-xl' : 'border-purple-100'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                      ЛУЧШИЙ ВЫБОР
                    </div>
                  )}
                  <div className="space-y-6 pt-4">
                    <div>
                      <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">
                        {plan.badge}
                      </Badge>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {plan.price}
                      </div>
                      <p className="text-gray-600">{plan.duration} доступа</p>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-500" />
                        <span className="text-sm">Все визуалы</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-500" />
                        <span className="text-sm">HD качество</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-500" />
                        <span className="text-sm">Новые релизы</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-green-500" />
                        <span className="text-sm">Поддержка 24/7</span>
                      </li>
                    </ul>
                    <Button 
                      className={`w-full ${
                        index === 1 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : 'bg-purple-600 hover:bg-purple-700'
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

        {activeTab === 'admin' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold">Админ-панель</h2>
            </div>

            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="bg-purple-50">
                <TabsTrigger value="users">Пользователи</TabsTrigger>
                <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
                <TabsTrigger value="visuals">Визуалы</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Управление пользователями</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-purple-700" />
                        </div>
                        <div>
                          <p className="font-semibold">admin@minecraft-visuals.com</p>
                          <p className="text-sm text-gray-600">Администратор</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-600">Admin</Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Выдача подписок</h3>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Новая подписка
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {subscriptionPlans.map(plan => (
                      <Card key={plan.id} className="p-4 border-purple-100">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold">{plan.name}</h4>
                            <Badge variant="outline">{plan.price}</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Выдать
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="visuals" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Управление визуалами</h3>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Icon name="Upload" size={18} className="mr-2" />
                      Загрузить визуал
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {visualPacks.map(pack => (
                      <div key={pack.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img src={pack.image} alt={pack.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div>
                            <p className="font-semibold">{pack.title}</p>
                            <p className="text-sm text-gray-600">{pack.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="outline" size="sm">
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

      <footer className="bg-gradient-to-br from-purple-900 to-pink-900 text-white mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name="Box" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">MC Visuals</h3>
              </div>
              <p className="text-purple-200">Лучшие визуалы для Minecraft</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold">Продукт</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Визуалы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Цены</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold">Поддержка</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold">Социальные сети</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Icon name="MessageCircle" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-purple-200">
            <p>© 2024 MC Visuals. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;