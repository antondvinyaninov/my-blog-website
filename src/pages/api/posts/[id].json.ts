import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../../../utils/posts-manager';

export const getStaticPaths: GetStaticPaths = () => {
  const POSTS = getPosts();
  return POSTS.map(post => ({
    params: { id: post.id }
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const POSTS = getPosts();
  const post = POSTS.find(p => p.id === id);
  
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
