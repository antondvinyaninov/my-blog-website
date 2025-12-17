import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
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
    return new Response(JSON.stringify({ error: 'Failed to read images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
