# Настройка Supabase для блога

## 1. Подключение к Supabase

URL: https://baze-supabase.crv1ic.easypanel.host/
Username: supabase
Password: this_password_is_insecure_and_should_be_updated

## 2. Создание таблицы posts

Зайди в Supabase Studio → SQL Editor и выполни:

```sql
-- Создаем таблицу для постов
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category_id TEXT,
  category_name TEXT,
  category_color TEXT,
  author_id TEXT,
  author_name TEXT,
  author_avatar TEXT,
  author_bio TEXT,
  date TEXT,
  read_time TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  type TEXT DEFAULT 'standard',
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_status ON posts(status);

-- Включаем Row Level Security (опционально)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Политика: все могут читать
CREATE POLICY "Anyone can read posts" ON posts
  FOR SELECT USING (true);

-- Политика: только авторизованные могут изменять (настроим позже)
CREATE POLICY "Authenticated users can update posts" ON posts
  FOR ALL USING (true);
```

## 3. Получение API ключей

В Supabase Studio → Settings → API:
- **URL**: https://baze-supabase.crv1ic.easypanel.host
- **anon key**: (скопируй из настроек)
- **service_role key**: (скопируй из настроек)

## 4. Переменные окружения для приложения

Добавь в Easypanel для твоего приложения:

```
SUPABASE_URL=https://baze-supabase.crv1ic.easypanel.host
SUPABASE_ANON_KEY=<твой_anon_key>
SUPABASE_SERVICE_KEY=<твой_service_role_key>
```

## 5. Миграция данных

После настройки запусти endpoint `/api/migrate-to-supabase` чтобы перенести данные из posts.ts в БД.
