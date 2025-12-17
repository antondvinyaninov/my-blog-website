import { supabase } from '../lib/supabase';
import type { Post } from '../consts';

// Преобразование из формата БД в формат Post
function dbToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image,
    category: {
      id: row.category_id,
      name: row.category_name,
      color: row.category_color
    },
    author: {
      id: row.author_id,
      name: row.author_name,
      avatar: row.author_avatar,
      bio: row.author_bio,
      postCount: 0
    },
    date: row.date,
    readTime: row.read_time,
    views: row.views,
    likes: row.likes,
    comments: row.comments,
    type: row.type as 'standard' | 'video',
    featured: row.featured,
    status: row.status
  };
}

// Преобразование из формата Post в формат БД
function postToDb(post: Partial<Post>) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage,
    category_id: post.category?.id,
    category_name: post.category?.name,
    category_color: post.category?.color,
    author_id: post.author?.id,
    author_name: post.author?.name,
    author_avatar: post.author?.avatar,
    author_bio: post.author?.bio,
    date: post.date,
    read_time: post.readTime,
    views: post.views,
    likes: post.likes,
    comments: post.comments,
    type: post.type,
    featured: post.featured,
    status: post.status,
    updated_at: new Date().toISOString()
  };
}

// Получить все посты
export async function getPostsFromSupabase(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data.map(dbToPost);
}

// Получить пост по ID
export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return dbToPost(data);
}

// Обновить пост
export async function updatePostInSupabase(id: string, updates: Partial<Post>): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .update(postToDb(updates))
    .eq('id', id);

  if (error) {
    console.error('Error updating post:', error);
    return false;
  }

  return true;
}

// Создать пост
export async function createPostInSupabase(post: Post): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .insert([postToDb(post)]);

  if (error) {
    console.error('Error creating post:', error);
    return false;
  }

  return true;
}

// Удалить пост
export async function deletePostFromSupabase(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }

  return true;
}
