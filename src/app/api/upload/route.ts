import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

// NEXT.JS 14 App Router 默认禁用 bodyParser，我们用 FormData API 流式读取
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
};

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * POST /api/upload
 * Body: multipart/form-data  { file: File }
 * Response: { ok: true, url: '/uploads/xxx.jpg', name: 'xxx.jpg', size: n }
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: '缺少文件字段 file' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: `不支持的图片类型：${file.type || '未知'}。支持 jpg/png/webp/gif/svg。` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { ok: false, error: `图片过大（${(file.size / 1024 / 1024).toFixed(2)}MB），最大允许 5MB。` },
        { status: 400 }
      );
    }

    // 准备目录：<projectRoot>/public/uploads
    const projectRoot = process.cwd();
    const uploadDir = path.join(projectRoot, 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const ext = ALLOWED_EXT[file.type] || '.bin';
    const baseName = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
    const absolutePath = path.join(uploadDir, baseName);

    const arrayBuffer = await file.arrayBuffer();
    await writeFile(absolutePath, Buffer.from(arrayBuffer));

    const url = `/uploads/${baseName}`;
    return NextResponse.json({ ok: true, url, name: baseName, size: file.size, type: file.type });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[api/upload] 上传失败：', err);
    return NextResponse.json({ ok: false, error: '服务器上传失败：' + msg }, { status: 500 });
  }
}
