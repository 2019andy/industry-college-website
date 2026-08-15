import { readContent } from '@/lib/storage';
import type { SiteContent } from '@/lib/types';

// 服务端读取全站内容（供 Server Components 使用）
export async function getSiteContent(): Promise<SiteContent> {
  return readContent();
}

export async function getSection<T extends keyof SiteContent>(
  section: T
): Promise<SiteContent[T]> {
  const content = await getSiteContent();
  return content[section];
}
