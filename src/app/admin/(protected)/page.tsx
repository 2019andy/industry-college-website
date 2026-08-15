import Link from 'next/link';
import {
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
  ArrowRight,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const content = await getSiteContent();
  const userName = '系统管理员';

  const stats = [
    { label: '专业数量', value: content.programs.length, icon: GraduationCap, color: 'from-blue-500 to-blue-700', href: '/admin/programs' },
    { label: '合作企业', value: content.partners.length, icon: Building2, color: 'from-green-500 to-green-700', href: '/admin/partners' },
    { label: '师资团队', value: content.facultyMembers.length, icon: Users, color: 'from-purple-500 to-purple-700', href: '/admin/faculty' },
    { label: '新闻动态', value: content.newsList.length, icon: Newspaper, color: 'from-gold-500 to-gold-700', href: '/admin/news' },
  ];

  const quickLinks = [
    { label: '站点设置', desc: '管理学院名称、描述、关键词', href: '/admin/site-config', icon: Settings },
    { label: '导航菜单', desc: '管理网站导航结构', href: '/admin/navigation', icon: BarChart3 },
    { label: '首页横幅', desc: '管理首页统计数据', href: '/admin/hero-stats', icon: TrendingUp },
    { label: '学院亮点', desc: '管理学院四大亮点', href: '/admin/about-highlights', icon: Info },
    { label: '专业管理', desc: '管理专业设置与课程', href: '/admin/programs', icon: GraduationCap },
    { label: '合作企业', desc: '管理企业合作伙伴', href: '/admin/partners', icon: Building2 },
    { label: '师资团队', desc: '管理师资信息', href: '/admin/faculty', icon: Users },
    { label: '新闻动态', desc: '管理新闻文章', href: '/admin/news', icon: Newspaper },
    { label: '实训基地', desc: '管理实训基地信息', href: '/admin/training-bases', icon: Wrench },
    { label: '联系信息', desc: '管理联系方式与地址', href: '/admin/contact', icon: Phone },
    { label: '社交链接', desc: '管理社交媒体账号', href: '/admin/social-links', icon: Share2 },
  ];

  const recentNews = content.newsList.slice(0, 4);

  return (
    <div>
      {/* Welcome banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-dark-950 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">欢迎回来，{userName} 👋</h2>
          <p className="text-sm text-white/70">从这里管理中跨数字贸易产业学院官网的全部内容</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-2xl bg-white border border-dark-100 p-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg mb-4`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-dark-900 mb-1">{s.value}</div>
              <div className="text-sm text-dark-500">{s.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick links + Recent news */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick links */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-dark-900 mb-4">快捷操作</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickLinks.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.href}
                  href={q.href}
                  className="group flex items-center gap-4 rounded-xl bg-white border border-dark-100 p-4 hover:border-primary-200 hover:shadow-card transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-dark-900 group-hover:text-primary-700 transition-colors">{q.label}</div>
                    <div className="text-xs text-dark-500 truncate">{q.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-dark-300 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent news */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-dark-900">最新动态</h3>
            <Link href="/admin/news" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              全部 →
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.map((n) => (
              <Link
                key={n.id}
                href="/admin/news"
                className="block rounded-xl bg-white border border-dark-100 p-4 hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold rounded bg-primary-50 px-1.5 py-0.5 text-primary-700">{n.category}</span>
                  <span className="text-[11px] text-dark-400">{n.date}</span>
                </div>
                <div className="text-sm font-semibold text-dark-800 line-clamp-2">{n.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Preview link */}
      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          <Eye className="h-4 w-4" />
          在新窗口预览官网效果
        </Link>
      </div>
    </div>
  );
}
