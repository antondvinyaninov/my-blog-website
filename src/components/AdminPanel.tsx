import { useState } from 'react';
import { LayoutDashboard, FileText, Settings, Image, Users, TrendingUp, Menu, X } from 'lucide-react';

type Tab = 'dashboard' | 'posts' | 'pages' | 'media' | 'settings';

interface MenuItem {
  id: Tab;
  name: string;
  icon: any;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Панель управления', icon: LayoutDashboard },
    { id: 'posts', name: 'Статьи', icon: FileText },
    { id: 'pages', name: 'Страницы', icon: FileText },
    { id: 'media', name: 'Медиа', icon: Image },
    { id: 'settings', name: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Админ панель</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-left">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Stats Widget */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-900">Статистика</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">1.2k</p>
              <p className="text-xs text-purple-700">просмотров сегодня</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold text-slate-900">
                  {menuItems.find(item => item.id === activeTab)?.name}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                ● Онлайн
              </span>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'dashboard' && <DashboardContent />}
              {activeTab === 'posts' && <PostsContent />}
              {activeTab === 'pages' && <PagesContent />}
              {activeTab === 'media' && <MediaContent />}
              {activeTab === 'settings' && <SettingsContent />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const stats = [
    { label: 'Всего статей', value: '10', color: 'from-blue-500 to-blue-600', icon: FileText },
    { label: 'Опубликовано', value: '8', color: 'from-green-500 to-green-600', icon: TrendingUp },
    { label: 'Черновики', value: '2', color: 'from-yellow-500 to-yellow-600', icon: FileText },
    { label: 'Просмотры', value: '1.2k', color: 'from-purple-500 to-purple-600', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-white/80 text-sm mb-1">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Быстрый старт</h3>
            <p className="text-slate-600 mb-4">
              Для редактирования контента измените файлы в <code className="bg-slate-100 px-2 py-1 rounded text-sm">src/data/posts.ts</code>
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <p>Добавьте новые статьи в массив POSTS</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <p>Загрузите изображения в public/images/</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <p>Закоммитьте изменения: <code className="bg-slate-100 px-2 py-1 rounded">git push origin2</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-yellow-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Редактирование статей</h3>
            <p className="text-slate-700 text-sm mb-3">
              Для редактирования статей измените файл <code className="bg-yellow-100 px-2 py-1 rounded text-sm">src/data/posts.ts</code>
            </p>
            <a href="https://github.com/antondvinyaninov/antondvinyaninov.github.io/blob/main/src/data/posts.ts" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors text-sm font-medium">
              Открыть на GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PagesContent() {
  const pages = [
    { name: 'Главная', path: '/', status: 'active' },
    { name: 'Блог', path: '/blog', status: 'active' },
    { name: 'Админка', path: '/admin', status: 'active' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <div key={page.path} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{page.name}</h3>
              <p className="text-sm text-slate-500">{page.path}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Активна
            </span>
          </div>
          <a href={page.path} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
            Открыть →
          </a>
        </div>
      ))}
    </div>
  );
}

function MediaContent() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
      <Image className="w-16 h-16 mx-auto text-slate-400 mb-4" />
      <h3 className="text-lg font-semibold text-slate-700 mb-2">Загрузите изображения</h3>
      <p className="text-slate-500 mb-4">Добавьте файлы в папку public/images/</p>
      <code className="inline-block bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-700">
        public/images/your-image.jpg
      </code>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Деплой</h3>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div>
            <p className="font-medium text-slate-900">GitHub Pages</p>
            <a href="https://antondvinyaninov.github.io/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
              https://antondvinyaninov.github.io/
            </a>
          </div>
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium shadow-sm">
            ● Активен
          </span>
        </div>
      </div>

      <hr className="border-slate-200" />

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Версия</h3>
        <div className="flex items-center gap-4">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-xl font-mono font-bold text-lg">
            v1.0.0
          </span>
          <a href="https://github.com/antondvinyaninov/antondvinyaninov.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Посмотреть на GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
