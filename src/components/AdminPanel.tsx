import { useState } from 'react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold">Админ панель</h1>
          <p className="text-blue-100 mt-2">Управление контентом и настройками сайта</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-64 bg-slate-50 border-r border-slate-200 p-4">
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('dashboard')} className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white">
                Панель управления
              </button>
              <button onClick={() => setActiveTab('posts')} className="w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-200">
                Статьи
              </button>
              <button onClick={() => setActiveTab('settings')} className="w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-200">
                Настройки
              </button>
            </nav>
          </div>

          <div className="flex-1 p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Обзор</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Быстрый старт</h3>
                  <p className="text-blue-700">Для редактирования контента измените файлы в src/data/posts.ts</p>
                </div>
              </div>
            )}
            
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Управление статьями</h2>
                <p className="text-slate-600">Измените файл src/data/posts.ts</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Настройки сайта</h2>
                <p className="text-slate-700">Версия: v1.0.0</p>
                <p className="text-slate-700">GitHub Pages: https://antondvinyaninov.github.io/</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
