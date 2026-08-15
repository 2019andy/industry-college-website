'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Info,
  GraduationCap,
  Building2,
  Users,
  Newspaper,
  Wrench,
  Phone,
  Share2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { label: '控制台', href: '/admin', icon: LayoutDashboard },
  { label: '站点设置', href: '/admin/site-config', icon: Settings },
  { label: '导航菜单', href: '/admin/navigation', icon: BarChart3 },
  { label: '首页横幅', href: '/admin/hero-stats', icon: BarChart3 },
  { label: '学院亮点', href: '/admin/about-highlights', icon: Info },
  { label: '专业管理', href: '/admin/programs', icon: GraduationCap },
  { label: '合作企业', href: '/admin/partners', icon: Building2 },
  { label: '师资团队', href: '/admin/faculty', icon: Users },
  { label: '新闻动态', href: '/admin/news', icon: Newspaper },
  { label: '实训基地', href: '/admin/training-bases', icon: Wrench },
  { label: '联系信息', href: '/admin/contact', icon: Phone },
  { label: '社交链接', href: '/admin/social-links', icon: Share2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="fixed top-4 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-dark-900 text-white shadow-lg"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-dark-950 text-dark-200 flex flex-col transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30">
            <span className="font-display text-base font-bold">中</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate">管理后台</div>
            <div className="text-[10px] text-gold-400 tracking-widest">ZHONGKUAN ADMIN</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'bg-gradient-to-r from-primary-600/30 to-primary-500/10 text-white border-l-2 border-gold-400'
                    : 'text-dark-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/5 p-3 space-y-0.5 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-dark-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Building2 className="h-4.5 w-4.5" />
            访问官网
          </Link>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4.5 w-4.5" />
            退出登录
          </button>
        </div>
      </aside>
    </>
  );
}
