import fs from 'fs';
import path from 'path';
import { POSTS } from '../data/posts';
import type { Post } from '../consts';

const OVERRIDES_PATH = path.join(process.cwd(), 'data/posts-overrides.json');

// Читаем переопределения из JSON
function loadOverrides(): Record<string, Partial<Post>> {
  try {
    if (fs.existsSync(OVERRIDES_PATH)) {
      const content = fs.readFileSync(OVERRIDES_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error loading overrides:', error);
  }
  return {};
}

// Сохраняем переопределения в JSON
function saveOverrides(overrides: Record<string, Partial<Post>>) {
  try {
    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving overrides:', error);
  }
}

// Получаем посты с применением переопределений
export function getPosts(): Post[] {
  const overrides = loadOverrides();
  
  return POSTS.map(post => {
    if (overrides[post.id]) {
      return { ...post, ...overrides[post.id] };
    }
    return post;
  });
}

// Обновляем поле поста
export function updatePost(id: string, updates: Partial<Post>): boolean {
  try {
    const overrides = loadOverrides();
    overrides[id] = { ...(overrides[id] || {}), ...updates };
    saveOverrides(overrides);
    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
}
