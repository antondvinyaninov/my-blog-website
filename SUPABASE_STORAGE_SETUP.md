# Настройка Supabase Storage для изображений

## Проблема
Сейчас изображения в `public/images/`, но посты в Supabase.
Нужно хранить изображения в Supabase Storage с автоматической оптимизацией.

## Решение

### 1. Создать bucket в Supabase
```sql
-- В Supabase Dashboard → Storage → Create bucket
-- Имя: blog-images
-- Public: true
```

### 2. Настроить политики доступа
```sql
-- Чтение для всех
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Загрузка для авторизованных
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
```

### 3. API для загрузки с оптимизацией
Создать `/api/upload-image.ts`:
- Принимает файл
- Конвертирует в WebP через sharp
- Загружает в Supabase Storage
- Возвращает URL

### 4. Обновить MediaLibrary
- Показывать изображения из Supabase Storage
- Добавить кнопку загрузки
- Оптимизировать при загрузке

### 5. Миграция существующих изображений
- Загрузить все из `public/images/` в Supabase Storage
- Обновить пути в постах
- Удалить локальные файлы

## Преимущества
- ✅ Централизованное хранилище
- ✅ Автоматическая оптимизация
- ✅ CDN от Supabase
- ✅ Масштабируемость
- ✅ Резервное копирование

## Следующие шаги
1. Создать bucket в Supabase
2. Реализовать API загрузки
3. Обновить MediaLibrary
4. Мигрировать изображения
