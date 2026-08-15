import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent, ContentSection } from './types';
import defaultContent from '../../content/content.json';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const CONTENT_FILE = path.join(CONTENT_DIR, 'content.json');

// 内存缓存
let contentCache: SiteContent | null = null;

export async function readContent(): Promise<SiteContent> {
  if (contentCache) return contentCache;

  try {
    const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
    contentCache = JSON.parse(raw) as SiteContent;
    return contentCache;
  } catch (err) {
    // 文件系统读取失败时，回退到打包时导入的默认数据
    console.warn('[storage] 文件系统读取失败，使用内置默认数据:', (err as Error).message);
    contentCache = defaultContent as unknown as SiteContent;
    return contentCache;
  }
}

export async function readSection<T extends ContentSection>(
  section: T
): Promise<SiteContent[T]> {
  const content = await readContent();
  return content[section];
}

export async function writeSection<T extends ContentSection>(
  section: T,
  data: SiteContent[T]
): Promise<void> {
  const content = await readContent();
  content[section] = data;
  await writeContent(content);
}

export async function writeContent(content: SiteContent): Promise<void> {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
  } catch (err) {
    console.error('[storage] 写入文件失败:', (err as Error).message);
  }
  contentCache = content;
}

export async function updateSectionField<T extends ContentSection>(
  section: T,
  updates: Partial<SiteContent[T]>
): Promise<SiteContent[T]> {
  const content = await readContent();
  content[section] = { ...content[section], ...updates };
  await writeContent(content);
  return content[section];
}

export function clearCache(): void {
  contentCache = null;
}
