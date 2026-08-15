import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zhongkuan-digital-trade-2026-secret-key'
);
const COOKIE_NAME = 'admin_token';

// 不需要认证的路径
const PUBLIC_PATHS = ['/admin/login', '/api/auth/login', '/api/auth/logout'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 放行公开路径
  if (PUBLIC_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  // 仅保护 /admin 和 /api/admin 路径
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // 检查认证 Cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    // 如果是 API 请求，返回 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }
    // 页面请求，重定向到登录页
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: '会话已过期，请重新登录' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('expired', '1');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
