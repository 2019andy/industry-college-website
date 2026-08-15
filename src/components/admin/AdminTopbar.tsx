'use client';

import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

const titleMap: Record<string, { title: string; subtitle?: string }> = {
  '/admin': { title: '控制台', subtitle: '官网内容管理总览' },
  '/admin/site-config': { title: '站点设置', subtitle: '管理学院名称、描述与关键词' },
  '/admin/navigation': { title: '导航菜单', subtitle: '管理网站导航结构' },
  '/admin/hero-stats': { title: '首页横幅', subtitle: '管理首页统计数据' },
  '/admin/about-highlights': { title: '学院亮点', subtitle: '管理学院四大亮点' },
  '/admin/programs': { title: '专业管理', subtitle: '管理专业设置与课程体系' },
  '/admin/partners': { title: '合作企业', subtitle: '管理企业合作伙伴' },
  '/admin/faculty': { title: '师资团队', subtitle: '管理师资信息' },
  '/admin/news': { title: '新闻动态', subtitle: '管理新闻文章' },
  '/admin/training-bases': { title: '实训基地', subtitle: '管理实训基地信息' },
  '/admin/contact': { title: '联系信息', subtitle: '管理联系方式与地址' },
  '/admin/social-links': { title: '社交链接', subtitle: '管理社交媒体账号' },
};

export default function AdminTopbar({ userName }: { userName?: string }) {
  const pathname = usePathname();
  const config = titleMap[pathname] ?? { title: '管理后台', subtitle: undefined };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white/80 backdrop-blur-lg border-b border-dark-100 px-6 md:px-8 h-16">
      <div className="lg:ml-0 ml-12">
        <h1 className="text-base md:text-lg font-bold text-dark-900">{config.title}</h1>
        {config.subtitle && <p className="text-xs text-dark-500 hidden md:block">{config.subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-dark-50 px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <User className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold text-dark-700">{userName || '管理员'}</span>
        </div>
      </div>
    </header>
  );
}
