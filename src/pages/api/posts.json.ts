import type { APIRoute } from 'astro';
import { POSTS } from '../../data/posts';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(POSTS), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    // TODO: Здесь нужно сохранить данные в файл
    // Пока просто возвращаем успех
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid data' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('📝 Updating post:', body.id);

    // Читаем текущий файл posts.ts
    const postsFilePath = path.join(process.cwd(), 'src/data/posts.ts');
    let fileContent = fs.readFileSync(postsFilePath, 'utf-8');

    // Находим конкретный пост по ID через регулярное выражение
    const postRegex = new RegExp(
      `(\\{[^}]*id:\\s*'${body.id}'[^}]*coverImage:\\s*)'([^']*)'`,
      'gs'
    );

    // Проверяем, найден ли пост
    if (!postRegex.test(fileContent)) {
      // Пробуем другой формат (с двойными кавычками)
      const postRegex2 = new RegExp(
        `(\\{[^}]*id:\\s*'${body.id}'[^}]*coverImage:\\s*)"([^"]*)"`,
        'gs'
      );
      
      if (!postRegex2.test(fileContent)) {
        return new Response(JSON.stringify({
          success: false,
          message: `Post with id ${body.id} not found`
        }), { status: 404 });
      }
      
      // Заменяем с двойными кавычками
      fileContent = fileContent.replace(postRegex2, `$1'${body.coverImage}'`);
    } else {
      // Заменяем с одинарными кавычками
      fileContent = fileContent.replace(postRegex, `$1'${body.coverImage}'`);
    }

    // Записываем обратно в файл
    fs.writeFileSync(postsFilePath, fileContent, 'utf-8');

    console.log('✅ Post coverImage updated successfully');

    return new Response(JSON.stringify({
      success: true,
      message: 'Post updated successfully',
      updatedField: 'coverImage',
      newValue: body.coverImage
    }), { status: 200 });

  } catch (error) {
    console.error('❌ Error updating post:', error);
    return new Response(JSON.stringify({
      success: false,
      message: String(error)
    }), { status: 500 });
  }
};
