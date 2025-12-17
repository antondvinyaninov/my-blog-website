import type { APIRoute } from 'astro';
import { updatePostInSupabase } from '../../utils/posts-supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('📝 Updating post:', body.id);

    if (!body.id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing post id'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Обновляем пост в Supabase
    const success = await updatePostInSupabase(body.id, {
      coverImage: body.coverImage,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      // Добавьте другие поля по необходимости
    });

    if (!success) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to update post in database'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Post updated successfully in Supabase');

    return new Response(JSON.stringify({
      success: true,
      message: 'Post updated successfully',
      updatedFields: Object.keys(body).filter(k => k !== 'id')
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
