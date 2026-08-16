import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import SafeHtml from '@/components/SafeHtml';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type IconMap = Record<string, React.ComponentType<{className?: string}>>;
const iconMap: IconMap = {
  Award: LucideIcons.Award,
  Building2: LucideIcons.Building2,
  Briefcase: LucideIcons.Briefcase,
  Users: LucideIcons.Users,
  Target: LucideIcons.Target,
  Eye: LucideIcons.Eye,
  Heart: LucideIcons.Heart,
  Lightbulb: LucideIcons.Lightbulb,
  GraduationCap: LucideIcons.GraduationCap,
  Rocket: LucideIcons.Rocket,
  Sparkles: LucideIcons.Sparkles,
  Trophy: LucideIcons.Trophy,
  ShieldCheck: LucideIcons.ShieldCheck,
  ArrowRight: LucideIcons.ArrowRight,
  TrendingUp: LucideIcons.TrendingUp,
  BookOpen: LucideIcons.BookOpen,
  CheckCircle: LucideIcons.CheckCircle,
  Cpu: LucideIcons.Cpu,
  Globe: LucideIcons.Globe,
  Store: LucideIcons.Store,
  Layers: LucideIcons.Layers,
  Clock: LucideIcons.Clock,
  UserCheck: LucideIcons.UserCheck,
  Handshake: LucideIcons.Handshake,
  BriefcaseBusiness: LucideIcons.BriefcaseBusiness,
  Network: LucideIcons.Network,
  LineChart: LucideIcons.LineChart,
  School: LucideIcons.School,
  MapPin: LucideIcons.MapPin,
  Bus: LucideIcons.Bus,
  Car: LucideIcons.Car,
  Train: LucideIcons.Train,
  Phone: LucideIcons.Phone,
  Mail: LucideIcons.Mail,
  MessageCircle: LucideIcons.MessageCircle,
  QrCode: LucideIcons.QrCode,
  Headphones: LucideIcons.Headphones,
  PlayCircle: LucideIcons.PlayCircle,
  Zap: LucideIcons.Zap,
  Star: LucideIcons.Star,
  Gift: LucideIcons.Gift,
  Twitter: LucideIcons.Twitter,
  Music: LucideIcons.Music,
  Linkedin: LucideIcons.Linkedin,
};

export default async function AboutPage() {
  const content = await getSiteContent();
  const about = content.aboutPage;
  const introPrimary = about.introPrimaryParagraph?.trim()
    ? about.introPrimaryParagraph
    : content.siteConfig.description;

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />

      <PageHero
        title={about.banner.title}
        subtitle={about.banner.subtitle}
        breadcrumb={about.banner.breadcrumb}
      />

      {/* 学院简介 */}
      <section id="intro" className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* 左侧 - 标题与简介文字 */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
                INTRODUCTION · 学院简介
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
                {about.introTitle}
                <br />
                <span className="heading-gradient">{about.introTitleHighlight}</span>
              </h2>
              <SafeHtml
                html={introPrimary}
                variant="prose-like"
                className="mb-6"
              />
              <SafeHtml
                html={about.introSecondaryParagraph}
                variant="body"
                className="text-sm md:text-base text-dark-500 mb-8"
              />

              {/* 数据快览 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {content.heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="card-elegant p-4 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold heading-gradient font-display tracking-tight">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-xs text-dark-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧 - 使命愿景卡片 */}
            <div className="lg:col-span-5 space-y-4">
              {about.visionCards.map((v) => {
                const Icon = iconMap[v.icon] || LucideIcons.CircleHelp;
                return (
                  <div
                    key={v.id}
                    className="group relative card-elegant p-6 overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform',
                          v.color
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-primary-600 tracking-wider mb-1">
                          {v.label}
                        </div>
                        <h3 className="text-base font-bold text-dark-900 mb-2">
                          {v.title}
                        </h3>
                        <SafeHtml
                          html={v.description}
                          variant="compact"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程 - 时间线 */}
      <section id="history" className="section-padding bg-gradient-to-b from-white via-primary-50/40 to-white relative overflow-hidden">
        <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-gold-100/50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="inline-flex items-center rounded-full bg-gold-50 border border-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              HISTORY · 发展历程
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              十二载砥砺前行
              <span className="heading-gradient"> 铸就产业学院标杆</span>
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed">
              从建校奠基到国家级示范，我们用十二年时间走出一条产教融合的中国路径。
            </p>
          </div>

          {/* 时间线主体 */}
          <div className="relative max-w-4xl mx-auto">
            {/* 中线 */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-gold-400 md:-translate-x-1/2" />

            <div className="space-y-10 md:space-y-16">
              {about.timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const Icon = iconMap[item.icon] || LucideIcons.CircleHelp;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      'relative flex items-start md:items-center gap-6 md:gap-0',
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                    {/* 节点圆点 */}
                    <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/30 ring-4 ring-white">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    {/* 内容卡片 - 左侧留白占位 */}
                    <div className={cn('hidden md:block md:w-1/2', isLeft ? '' : 'order-3')} />

                    {/* 内容卡片 - 实际内容 */}
                    <div
                      className={cn(
                        'ml-14 md:ml-0 md:w-1/2',
                        isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                      )}
                    >
                      <div className="card-elegant p-6 md:p-7">
                        <div className={cn('flex items-center gap-3 mb-3', isLeft && 'md:justify-end')}>
                          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
                            {item.milestone}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold heading-gradient font-display tracking-tight">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-dark-900 mb-2">
                          {item.title}
                        </h3>
                        <SafeHtml
                          html={item.description}
                          variant="compact"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 学院亮点 - 交替排列 */}
      <section id="organization" className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              HIGHLIGHTS · 学院亮点
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              四大核心特色
              <span className="heading-gradient"> 铸就育人优势</span>
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed">
              AI赋能、校企协同、项目驱动、双师护航，每一个亮点都直指应用型人才培养的关键命题。
            </p>
          </div>

          {/* 亮点列表 - 图标+文字交替排列 */}
          <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {content.aboutHighlights.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = iconMap[item.icon] || LucideIcons.CircleHelp;
              return (
                <div
                  key={item.id}
                  className={cn(
                    'group flex flex-col md:flex-row items-stretch gap-6',
                    !isLeft && 'md:flex-row-reverse'
                  )}
                >
                  {/* 大图标卡 */}
                  <div className="md:w-2/5">
                    <div
                      className={cn(
                        'relative h-full min-h-[200px] rounded-3xl bg-gradient-to-br p-8 flex items-center justify-center overflow-hidden',
                        idx === 0 && 'from-primary-600 via-primary-700 to-primary-900',
                        idx === 1 && 'from-gold-500 via-gold-600 to-gold-700',
                        idx === 2 && 'from-primary-700 via-primary-600 to-gold-500',
                        idx === 3 && 'from-gold-600 via-primary-700 to-primary-900'
                      )}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      <div className="relative z-10 text-center">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm text-white mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-10 w-10" />
                        </div>
                        <div className="text-sm font-bold text-white/80 tracking-widest">
                          0{item.id} · HIGHLIGHT
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 文字内容卡 */}
                  <div className="md:w-3/5">
                    <div className="card-elegant p-7 md:p-9 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-gold-600 tracking-wider">
                          FEATURE 0{item.id}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-dark-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-dark-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 领导团队 */}
      <section id="leadership" className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        </div>
        <div className="container-page relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              LEADERSHIP · 领导团队
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {about.leadershipTitle}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {' '}{about.leadershipHighlight}
              </span>
            </h2>
            <SafeHtml
              html={about.leadershipParagraph}
              variant="prose-like"
              className="max-w-2xl mx-auto text-dark-300"
            />
          </div>

          {/* 领导团队成员网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.leadershipMembers.map((m) => {
              const initial = m.name.charAt(0);
              return (
                <div
                  key={m.id}
                  className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 text-center overflow-hidden hover:bg-white/[0.06] hover:border-gold-500/30 transition-all"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gold-500/5 blur-2xl" />
                  <div className="relative z-10">
                    {/* 头像：有照片 → 显示照片；无照片 → 首字 + 渐变圆 */}
                    <div className="relative mx-auto h-20 w-20 mb-5 group-hover:scale-105 transition-transform">
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          className="h-full w-full rounded-2xl object-cover shadow-lg ring-2 ring-white/20"
                        />
                      ) : (
                        <div
                          className={cn(
                            'flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg font-display text-3xl font-bold',
                            m.accent
                          )}
                        >
                          {initial}
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-gold-400 tracking-widest mb-2">
                      {m.tagline}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
                    <div className="text-xs text-dark-400 mb-4">{m.position}</div>
                    <SafeHtml
                      html={m.description}
                      variant="compact"
                      className="text-sm text-dark-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link href="/faculty" className="btn-gold">
              查看师资详情
              <LucideIcons.ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <LucideIcons.Lightbulb className="h-4 w-4" />
              预约学院参观
            </Link>
          </div>
        </div>
      </section>

      <Footer
        navigation={content.navigation}
        contactInfo={content.contactInfo}
        socialLinks={content.socialLinks}
      />
      <BackToTop />
    </main>
  );
}
