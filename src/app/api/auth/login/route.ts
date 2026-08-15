import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '请输入用户名和密码' },
        { status: 400 }
      );
    }

    const admin = await verifyCredentials(username, password);
    if (!admin) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    const token = await createToken(admin);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: { username: admin.username, name: admin.name, role: admin.role },
    });
  } catch {
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}
