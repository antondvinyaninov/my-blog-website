import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('📝 Updating post:', body.id);

    if (!body.id || !body.coverImage) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing id or coverImage'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Читаем текущий файл posts.ts
    const postsFilePath = path.join(process.cwd(), 'src/data/posts.ts');
    let fileContent = fs.readFileSync(postsFilePath, 'utf-8');

    // Находим конкретный пост по ID (многострочный поиск)
    const postRegex = new RegExp(
      `(id:\\s*'${body.id}'[\\s\\S]*?coverImage:\\s*)'([^']*)'`,
      'g'
    );

    // Проверяем, найден ли пост
    const match = fileContent.match(postRegex);
    
    if (!match) {
      console.error(`❌ Post with id ${body.id} not found in posts.ts`);
      return new Response(JSON.stringify({
        success: false,
        message: `Post with id ${body.id} not found`
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Заменяем coverImage
    fileContent = fileContent.replace(postRegex, `$1'${body.coverImage}'`);

    // Записываем обратно в файл
    fs.writeFileSync(postsFilePath, fileContent, 'utf-8');

    console.log('✅ Post coverImage updated successfully');

    return new Response(JSON.stringify({
      success: true,
      message: 'Post updated successfully',
      updatedField: 'coverImage',
      newValue: body.coverImage
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error updating post:', error);
    return new Response(JSON.stringify({
      success: false,
      message: String(error)
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
