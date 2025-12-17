import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Проверяем существование директории
    if (!fs.existsSync(imagesDir)) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const files = fs.readdirSync(imagesDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map(file => ({
        name: file,
        url: `/images/${file}`,
        size: fs.statSync(path.join(imagesDir, file)).size,
        modified: fs.statSync(path.join(imagesDir, file)).mtime
      }));
    
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Media API error:', error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
