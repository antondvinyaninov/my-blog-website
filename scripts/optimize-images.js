import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const imagesDir = './public/images';

async function optimizeImages(dir) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        await optimizeImages(filePath);
        continue;
      }
      
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        console.log(`Оптимизация: ${file}`);
        
        const outputWebP = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const outputAVIF = filePath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
        
        try {
          // Создаем WebP версию
          await sharp(filePath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputWebP);
          console.log(`  ✓ Создан ${outputWebP}`);
          
          // Создаем AVIF версию
          await sharp(filePath)
            .avif({ quality: 80, effort: 6 })
            .toFile(outputAVIF);
          console.log(`  ✓ Создан ${outputAVIF}`);
        } catch (err) {
          console.error(`  ✗ Ошибка при обработке ${file}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error('Ошибка при чтении директории:', err);
  }
}

console.log('Начинаем оптимизацию изображений...\n');
await optimizeImages(imagesDir);
console.log('\n✓ Оптимизация завершена!');
