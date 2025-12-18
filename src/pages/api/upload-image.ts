import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import sharp from 'sharp';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No file provided' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'File must be an image' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Читаем файл
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Оптимизируем изображение
    const optimizedBuffer = await sharp(buffer)
      .resize(1920, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toBuffer();

    // Генерируем уникальное имя файла
    const timestamp = Date.now();
    const originalName = file.name.replace(/\.[^/.]+$/, ''); // убираем расширение
    const fileName = `${originalName}-${timestamp}.webp`;

    // Загружаем в Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, optimizedBuffer, {
        contentType: 'image/webp',
        cacheControl: '31536000', // 1 год
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: error.message 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Получаем публичный URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log('✅ Image uploaded:', fileName);

    return new Response(JSON.stringify({ 
      success: true, 
      url: publicUrl,
      fileName: fileName,
      size: optimizedBuffer.length,
      originalSize: buffer.length,
      savings: Math.round((1 - optimizedBuffer.length / buffer.length) * 100)
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: String(error) 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
