import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

const AUTH_FILE = path.join(process.cwd(), 'content', 'auth.json');
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zhongkuan-digital-trade-2026-secret-key'
);
const COOKIE_NAME = 'admin_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7天

interface AdminUser {
  username: string;
  passwordHash: string;
  name: string;
  role: string;
}

async function readAdminConfig(): Promise<AdminUser[]> {
  try {
    const raw = await fs.readFile(AUTH_FILE, 'utf-8');
    const config = JSON.parse(raw);
    return config.admins ?? [];
  } catch {
    // 如果文件不存在，初始化默认管理员
    const defaultHash = await bcrypt.hash('admin123', 10);
    const defaultAdmins: AdminUser[] = [
      {
        username: 'admin',
        passwordHash: defaultHash,
        name: '系统管理员',
        role: 'superadmin',
      },
    ];
    await writeAdminConfig(defaultAdmins);
    return defaultAdmins;
  }
}

async function writeAdminConfig(admins: AdminUser[]): Promise<void> {
  const dir = path.dirname(AUTH_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    AUTH_FILE,
    JSON.stringify({ admins }, null, 2),
    'utf-8'
  );
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const admins = await readAdminConfig();
  const admin = admins.find((a) => a.username === username);
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.passwordHash);
  return valid ? admin : null;
}

export async function createToken(admin: AdminUser): Promise<string> {
  return new SignJWT({
    username: admin.username,
    name: admin.name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{
  username: string;
  name: string;
  role: string;
} | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      username: payload.username as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthUser(): Promise<{
  username: string;
  name: string;
  role: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  const admin = await verifyCredentials(username, oldPassword);
  if (!admin) return false;

  const admins = await readAdminConfig();
  const idx = admins.findIndex((a) => a.username === username);
  if (idx === -1) return false;

  admins[idx].passwordHash = await bcrypt.hash(newPassword, 10);
  await writeAdminConfig(admins);
  return true;
}

export { COOKIE_NAME, TOKEN_MAX_AGE };
