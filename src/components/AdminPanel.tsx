import { useState } from 'react';
import { LayoutDashboard, FileText, Newspaper, BarChart3, Search, Settings, Edit } from 'lucide-react';
import { POSTS } from '../data/posts';
import PostEditor from './PostEditor';
import type { Post } from '../consts';

interface AdminPanelProps {
  activeTab?: string;
}

export default function AdminPanel({ activeTab = 'dashboard' }: AdminPanelProps) {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState(POSTS);

  const handleSavePost = async (updatedPost: Post) => {
    // Обновляем пост в локальном состоянии
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    
    // TODO: Отправить на сервер для сохранения
    try {
      const response = await fetch('/api/posts.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
      });
      
      if (response.ok) {
        alert('Статья успешно сохранена!');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении статьи');
    }
    
    setEditingPost(null);
  };

  return (
    <>
    <div className="py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-6">
            <h1 className="text-3xl font-bold text-slate-900">Админ панель</h1>
            <p className="text-slate-600 mt-2">Управление контентом и настройками сайта</p>
          </div>

          <div className="flex flex-row min-h-[600px]">
            {/* Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex-shrink-0">
              <nav className="flex flex-col gap-2">
                <a
                  href="/admin"
                  className={
                    activeTab === 'dashboard' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <LayoutDashboard size={20} />
                  <span>Обзор</span>
                </a>
                <a
                  href="/admin/pages"
                  className={
                    activeTab === 'pages' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <FileText size={20} />
                  <span>Страницы</span>
                </a>
                <a
                  href="/admin/posts"
                  className={
                    activeTab === 'posts' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <Newspaper size={20} />
                  <span>Статьи</span>
                </a>
                <a
                  href="/admin/analytics"
                  className={
                    activeTab === 'analytics' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <BarChart3 size={20} />
                  <span>Метрика</span>
                </a>
                <a
                  href="/admin/seo"
                  className={
                    activeTab === 'seo' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <Search size={20} />
                  <span>SEO</span>
                </a>
                <a
                  href="/admin/settings"
                  className={
                    activeTab === 'settings' 
                      ? 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors bg-slate-200 text-slate-900 font-medium' 
                      : 'w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-200'
                  }
                >
                  <Settings size={20} />
                  <span>Настройки</span>
                </a>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Обзор и статистика</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <p className="text-slate-600 text-sm mb-2">Всего статей</p>
                      <p className="text-3xl font-bold text-blue-600">10</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <p className="text-slate-600 text-sm mb-2">Опубликовано</p>
                      <p className="text-3xl font-bold text-green-600">8</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <p className="text-slate-600 text-sm mb-2">Черновики</p>
                      <p className="text-3xl font-bold text-yellow-600">2</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                      <p className="text-slate-600 text-sm mb-2">Просмотры</p>
                      <p className="text-3xl font-bold text-purple-600">1.2k</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Быстрый старт</h3>
                    <p className="text-blue-700 mb-4">
                      Для редактирования контента измените файлы в src/data/posts.ts
                    </p>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• Добавьте новые статьи в массив POSTS</p>
                      <p>• Загрузите изображения в public/images/</p>
                      <p>• Закоммитьте изменения: git push origin2</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'pages' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Управление страницами</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <p className="text-blue-800 text-sm">
                      Здесь будет управление статическими страницами сайта
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'posts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Управление статьями</h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">Всего: {posts.length}</span>
                      <a
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        + Создать статью
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Название</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Категория</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Дата</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Просмотры</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Лайки</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Статус</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Действия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded-lg object-cover" />
                                  <div>
                                    <p className="font-medium text-slate-900">{post.title}</p>
                                    <p className="text-sm text-slate-500">{post.readTime}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.category.color}`}>
                                  {post.category.name}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600">{post.date}</td>
                              <td className="px-6 py-4 text-sm text-slate-600">{post.views}</td>
                              <td className="px-6 py-4 text-sm text-slate-600">{post.likes}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  Опубликовано
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <a
                                  href={`/admin/posts/${post.id}/edit`}
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium border border-blue-300"
                                  title="Редактировать статью"
                                >
                                  <Edit size={16} className="text-blue-700" />
                                  <span className="text-blue-700">Редактировать</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Примечание:</strong> Для редактирования статей измените файл src/data/posts.ts
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Настройка метрики</h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <p className="text-purple-800 text-sm">
                      Здесь будут настройки Яндекс.Метрики и Google Analytics
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">SEO настройки</h2>
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <p className="text-green-800 text-sm">
                      Здесь будут настройки SEO: мета-теги, Open Graph, sitemap, robots.txt
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Настройки сайта</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Деплой</h3>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-900">GitHub Pages</p>
                          <p className="text-sm text-slate-500">https://antondvinyaninov.github.io/</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Активен
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Версия</h3>
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-mono font-bold">
                        v1.0.0
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {editingPost && (
      <>
        {console.log('Rendering PostEditor for:', editingPost)}
        <PostEditor
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleSavePost}
        />
      </>
    )}
    </>
  );
}
