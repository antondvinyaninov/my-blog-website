import type { APIRoute, GetStaticPaths } from 'astro';
import { getPostsFromSupabase, getPostById } from '../../../utils/posts-supabase';
import { POSTS as FALLBACK_POSTS } from '../../../data/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  let posts;
  try {
    posts = await getPostsFromSupabase();
    if (posts.length === 0) {
      posts = FALLBACK_POSTS;
    }
  } catch (error) {
    posts = FALLBACK_POSTS;
  }
  
  return posts.map(post => ({
    params: { id: post.id }
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const post = await getPostById(id!);
  
  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
