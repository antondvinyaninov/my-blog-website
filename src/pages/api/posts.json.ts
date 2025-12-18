import type { APIRoute } from 'astro';
import { getPostsFromSupabase } from '../../utils/posts-supabase';
import { POSTS } from '../../data/posts';

export const GET: APIRoute = async () => {
  try {
    const posts = await getPostsFromSupabase();
    
    // Если в БД нет данных, возвращаем из файла
    if (posts.length === 0) {
      console.log('⚠️ No posts in Supabase, using posts.ts');
      return new Response(JSON.stringify(POSTS), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('❌ Error fetching from Supabase, falling back to posts.ts:', error);
    return new Response(JSON.stringify(POSTS), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Если есть ID, значит это обновление
    if (data.id) {
      console.log('📝 Updating post:', data.id);

      // Читаем текущий файл posts.ts
      const postsFilePath = path.join(process.cwd(), 'src/data/posts.ts');
      let fileContent = fs.readFileSync(postsFilePath, 'utf-8');

      // Находим конкретный пост по ID через регулярное выражение
      const postRegex = new RegExp(
        `(\\{[^}]*id:\\s*'${data.id}'[^}]*coverImage:\\s*)'([^']*)'`,
        'gs'
      );

      // Проверяем, найден ли пост
      if (!postRegex.test(fileContent)) {
        // Пробуем другой формат (с двойными кавычками)
        const postRegex2 = new RegExp(
          `(\\{[^}]*id:\\s*'${data.id}'[^}]*coverImage:\\s*)"([^"]*)"`,
          'gs'
        );
        
        if (!postRegex2.test(fileContent)) {
          return new Response(JSON.stringify({
            success: false,
            message: `Post with id ${data.id} not found`
          }), { status: 404 });
        }
        
        // Заменяем с двойными кавычками
        fileContent = fileContent.replace(postRegex2, `$1'${data.coverImage}'`);
      } else {
        // Заменяем с одинарными кавычками
        fileContent = fileContent.replace(postRegex, `$1'${data.coverImage}'`);
      }

      // Записываем обратно в файл
      fs.writeFileSync(postsFilePath, fileContent, 'utf-8');

      console.log('✅ Post coverImage updated successfully');

      return new Response(JSON.stringify({
        success: true,
        message: 'Post updated successfully',
        updatedField: 'coverImage',
        newValue: data.coverImage
      }), { status: 200 });
    }
    
    // Иначе это создание нового поста
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('❌ Error in POST /api/posts.json:', error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};


