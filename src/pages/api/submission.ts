import type { APIRoute } from 'astro';
import { getPostsFromSupabase } from '../../utils/posts-supabase';
import { AUTHORS } from '../../data/authors';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    let body;
    
    try {
        const text = await request.text();
        console.log('📥 Received request body:', text);
        
        if (!text) {
            console.error('❌ Empty request body');
            return new Response(JSON.stringify({
                message: 'Empty request body'
            }), { status: 400 });
        }
        body = JSON.parse(text);
        console.log('✅ Parsed body:', body);
    } catch (error) {
        console.error('❌ JSON parse error:', error);
        return new Response(JSON.stringify({
            message: 'Invalid JSON',
            error: String(error)
        }), { status: 400 });
    }

    // Validate basic data
    if (!body.title) {
        console.error('❌ Missing title. Body keys:', Object.keys(body));
        return new Response(JSON.stringify({
            message: 'Missing required fields: title is required',
            receivedKeys: Object.keys(body)
        }), { status: 400 });
    }

    // Get current posts count
    const posts = await getPostsFromSupabase();
    
    // Create a new post object
    const newPost = {
        id: (posts.length + 1).toString(),
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        excerpt: body.excerpt || '',
        content: body.content || '',
        tags: body.tags || [],
        coverImage: body.coverImage || '/images/hero_pool.png',
        category: body.category ? { 
            id: body.category.toLowerCase(), 
            name: body.category, 
            color: 'bg-slate-100 text-slate-800' 
        } : { 
            id: 'uncategorized', 
            name: 'Uncategorized', 
            color: 'bg-slate-100 text-slate-800' 
        },
        author: AUTHORS[0],
        date: body.publishDate ? new Date(body.publishDate).toLocaleDateString('ru-RU', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        }) : new Date().toLocaleDateString('ru-RU', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        }),
        readTime: '3 min read',
        views: 0,
        likes: 0,
        comments: 0,
        type: 'standard' as const,
        status: body.status || 'draft',
        featured: body.featured || false,
        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription || body.excerpt,
    };

    // Logic to save data.
    // NOTE: Это статический сайт - данные НЕ сохраняются в файл автоматически!
    // Для сохранения изменений нужно вручную обновить src/data/posts.ts
    console.log('--- SUBMISSION RECEIVED ---');
    console.log('Данные для сохранения в src/data/posts.ts:');
    console.log(JSON.stringify(newPost, null, 2));
    console.log('---------------------------');

    return new Response(JSON.stringify({
        message: 'Данные получены! Для сохранения обновите src/data/posts.ts вручную.',
        post: newPost,
        note: 'Это статический сайт - изменения не сохраняются автоматически'
    }), { status: 200 });
};
