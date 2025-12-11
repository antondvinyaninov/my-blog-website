# Инструкция по развертыванию на GitHub Pages

## Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Введите название репозитория (например, `my-blog`)
3. Выберите "Public"
4. **НЕ** добавляйте README, .gitignore или лицензию
5. Нажмите "Create repository"

## Шаг 2: Загрузите код на GitHub

Выполните следующие команды в терминале (замените YOUR_USERNAME и REPO_NAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Шаг 3: Настройте GitHub Pages

1. Перейдите в Settings вашего репозитория
2. В левом меню выберите "Pages"
3. В разделе "Build and deployment":
   - Source: выберите "GitHub Actions"
4. Сохраните изменения

## Шаг 4: Обновите конфигурацию (если используете base path)

Если ваш репозиторий НЕ называется `YOUR_USERNAME.github.io`, откройте `astro.config.mjs` и раскомментируйте:

```javascript
site: 'https://YOUR_USERNAME.github.io',
base: '/REPO_NAME',
```

Замените YOUR_USERNAME и REPO_NAME на ваши данные.

Затем выполните:

```bash
git add astro.config.mjs
git commit -m "Update site config"
git push
```

## Шаг 5: Дождитесь деплоя

1. Перейдите во вкладку "Actions" вашего репозитория
2. Дождитесь завершения workflow (зеленая галочка)
3. Ваш сайт будет доступен по адресу:
   - `https://YOUR_USERNAME.github.io/REPO_NAME/` (если используете base)
   - `https://YOUR_USERNAME.github.io/` (если репозиторий называется YOUR_USERNAME.github.io)

## Альтернатива: Vercel (проще и быстрее)

1. Загрузите код на GitHub (Шаги 1-2)
2. Перейдите на https://vercel.com
3. Нажмите "Import Project"
4. Выберите ваш GitHub репозиторий
5. Нажмите "Deploy"
6. Готово! Vercel автоматически даст вам URL

## Поддержка

Если возникнут проблемы, проверьте:
- Все ли зависимости установлены (`npm install`)
- Собирается ли проект локально (`npm run build`)
- Правильно ли настроены permissions в GitHub Actions
