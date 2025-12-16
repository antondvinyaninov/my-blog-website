import type { APIRoute } from 'astro';
import { POSTS } from '../../data/posts';

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
