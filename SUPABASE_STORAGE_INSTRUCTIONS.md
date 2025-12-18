# Настройка Supabase Storage для изображений

## Шаг 1: Создать bucket в Supabase

1. Открой Supabase Dashboard: https://baze-supabase.crv1ic.easypanel.host/
2. Войди (username: `supabase`, password: `this_password_is_insecure_and_should_be_updated`)
3. Перейди в **Storage** (левое меню)
4. Нажми **New bucket**
5. Заполни:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ (включить)
   - **File size limit**: 50 MB
   - **Allowed MIME types**: `image/*`
6. Нажми **Create bucket**

## Шаг 2: Настроить политики доступа

Перейди в **Storage** → **Policies** → **blog-images** и создай политики:

### Политика 1: Публичное чтение
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
```

### Политика 2: Загрузка для всех (временно)
```sql
CREATE POLICY "Public upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');
```

**Примечание**: Позже можно ограничить загрузку только для авторизованных пользователей.

## Шаг 3: Получить API ключи

1. Перейди в **Settings** → **API**
2. Скопируй:
   - **URL**: `https://baze-supabase.crv1ic.easypanel.host`
   - **anon/public key**: (скопируй ключ)
   - **service_role key**: (скопируй ключ)

## Шаг 4: Добавить переменные окружения в Easypanel

1. Открой Easypanel: http://88.218.121.213:3000
2. Найди свой проект (блог)
3. Перейди в **Environment Variables**
4. Добавь:
```
SUPABASE_URL=https://baze-supabase.crv1ic.easypanel.host
SUPABASE_ANON_KEY=<твой_anon_key>
SUPABASE_SERVICE_KEY=<твой_service_role_key>
```
5. Сохрани и **Rebuild** проект

## Шаг 5: Проверить работу

1. Открой админку: https://test-github.crv1ic.easypanel.host/admin/media
2. Нажми **Загрузить**
3. Выбери изображение
4. Должно появиться сообщение об успешной загрузке
5. Изображение автоматически оптимизируется в WebP

## Что сделано в коде

### ✅ API для загрузки (`/api/upload-image`)
- Принимает изображение
- Автоматически конвертирует в WebP
- Сжимает до 1920px ширины
- Загружает в Supabase Storage
- Возвращает публичный URL

### ✅ Обновлена MediaLibrary
- Показывает изображения из Supabase Storage
- Кнопка "Загрузить" для новых изображений
- Fallback на локальные файлы если Supabase недоступен

### ✅ Оптимизация изображений
- Автоматическая конвертация в WebP
- Качество 85%
- Resize до 1920px
- Экономия 70-90% размера

## Миграция существующих изображений

После настройки можно мигрировать существующие изображения:

```bash
# Запустить миграцию (создадим отдельный скрипт)
npm run migrate:images
```

## Проверка

После настройки проверь:
- [ ] Bucket `blog-images` создан
- [ ] Политики доступа настроены
- [ ] Переменные окружения добавлены в Easypanel
- [ ] Проект пересобран
- [ ] Загрузка изображений работает
- [ ] Изображения отображаются в MediaLibrary

## Troubleshooting

### Ошибка "No API key found"
- Проверь переменные окружения в Easypanel
- Убедись что проект пересобран после добавления переменных

### Ошибка "Bucket not found"
- Проверь что bucket называется именно `blog-images`
- Проверь что bucket публичный

### Изображения не загружаются
- Проверь политики доступа в Supabase
- Проверь логи в Easypanel: `docker logs <container_name>`

---

**Дата**: 18 декабря 2024
**Статус**: Готово к настройке ✅
