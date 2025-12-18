# Исправление LCP (4.4с → < 2.5с)

## Что сделано:

1. ✅ Добавлен preload для hero изображения
2. ✅ Все изображения теперь используют WebP через <picture>
3. ✅ Упрощена загрузка шрифтов
4. ✅ Hero изображение использует decoding="sync"

## Следующие шаги:

### 1. Оптимизировать изображения
```bash
npm run optimize:images
```

### 2. Пересобрать проект
```bash
npm run build
```

### 3. Проверить локально
```bash
npm run preview
npx lighthouse http://localhost:4321 --view
```

### 4. Задеплоить
```bash
git add .
git commit -m "fix: LCP optimization - preload hero image, add WebP support"
git push origin main
```

## Ожидаемый результат:
- LCP: 4.4с → < 2.5с ✅
- Производительность: 85-93 → 95+ ✅
