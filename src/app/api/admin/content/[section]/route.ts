import { NextRequest, NextResponse } from 'next/server';
import { readSection, writeSection } from '@/lib/storage';
import { ALL_SECTIONS, type ContentSection, type SiteContent } from '@/lib/types';

type Params = { params: { section: string } };

// 校验 section 是否合法
function isValidSection(section: string): section is ContentSection {
  return (ALL_SECTIONS as string[]).includes(section);
}

// GET /api/admin/content/[section] - 读取某个板块内容
export async function GET(request: NextRequest, { params }: Params) {
  const { section } = params;

  if (!isValidSection(section)) {
    return NextResponse.json(
      { error: `无效的内容板块: ${section}` },
      { status: 400 }
    );
  }

  try {
    const data = await readSection(section);
    return NextResponse.json({ section, data });
  } catch (err) {
    return NextResponse.json(
      { error: '读取内容失败' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content/[section] - 更新某个板块内容
export async function PUT(request: NextRequest, { params }: Params) {
  const { section } = params;

  if (!isValidSection(section)) {
    return NextResponse.json(
      { error: `无效的内容板块: ${section}` },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const data = body.data;

    if (data === undefined) {
      return NextResponse.json(
        { error: '请求体缺少 data 字段' },
        { status: 400 }
      );
    }

    await writeSection(section, data as SiteContent[ContentSection]);

    return NextResponse.json({
      success: true,
      section,
      message: '内容已保存',
    });
  } catch (err) {
    return NextResponse.json(
      { error: '保存内容失败，请检查数据格式' },
      { status: 500 }
    );
  }
}
