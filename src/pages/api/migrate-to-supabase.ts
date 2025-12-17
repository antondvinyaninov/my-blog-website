import type { APIRoute } from 'astro';
import { POSTS } from '../../data/posts';
import { createPostInSupabase, getPostsFromSupabase } from '../../utils/posts-supabase';

export const POST: APIRoute = async () => {
  try {
    console.log('🔄 Starting migration to Supabase...');

    // Проверяем, есть ли уже данные в БД
    const existingPosts = await getPostsFromSupabase();
    
    if (existingPosts.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Database already contains posts. Clear it first if you want to re-migrate.',
        existingCount: existingPosts.length
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Мигрируем все посты
    let successCount = 0;
    let failCount = 0;

    for (const post of POSTS) {
      const success = await createPostInSupabase(post);
      if (success) {
        successCount++;
        console.log(`✅ Migrated post: ${post.title}`);
      } else {
        failCount++;
        console.error(`❌ Failed to migrate post: ${post.title}`);
      }
    }

    console.log(`🎉 Migration complete! Success: ${successCount}, Failed: ${failCount}`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Migration completed',
      migrated: successCount,
      failed: failCount,
      total: POSTS.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Migration error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
