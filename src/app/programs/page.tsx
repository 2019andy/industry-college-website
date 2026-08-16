import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import SafeHtml from '@/components/SafeHtml';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
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

export default async function ProgramsPage() {
  const content = await getSiteContent();
  const programsConfig = content.programsPage;
  const featuredCount = content.programs.filter((p) => p.featured).length;

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />

      <PageHero
        title={programsConfig.banner.title}
        subtitle={programsConfig.banner.subtitle}
        breadcrumb={programsConfig.banner.breadcrumb}
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {content.programs.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white/85 hover:bg-white/15 hover:text-white transition-colors"
            >
              {p.featured && <LucideIcons.Star className="h-3 w-3 fill-gold-400 text-gold-400" />}
              {p.name}
            </a>
          ))}
        </div>
      </PageHero>

      {/* 专业概览统计条 */}
      <section className="border-y border-dark-100 bg-gradient-to-r from-primary-50/60 via-white to-gold-50/60">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight">
                {content.programs.length}
              </div>
              <div className="text-xs text-dark-500 mt-1">大专业方向</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight">
                {featuredCount}
              </div>
              <div className="text-xs text-dark-500 mt-1">大热门王牌专业</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight">
                {content.programs.reduce((s, p) => s + p.curriculum.length, 0)}+
              </div>
              <div className="text-xs text-dark-500 mt-1">门核心课程</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight">
                {content.programs.reduce((s, p) => s + p.career.length, 0)}+
              </div>
              <div className="text-xs text-dark-500 mt-1">个就业方向</div>
            </div>
          </div>
        </div>
      </section>

      {/* 专业列表 */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary-50 blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-50 blur-3xl -z-10" />

        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              PROGRAMS · 全部专业
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              {programsConfig.overviewTitle}
              <span className="heading-gradient"> {programsConfig.overviewHighlight}</span>
            </h2>
            <SafeHtml
              html={programsConfig.overviewParagraph}
              variant="prose-like"
            />
          </div>

          {/* 专业列表 */}
          <div className="space-y-8 md:space-y-12">
            {content.programs.map((p, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <article
                  key={p.id}
                  id={p.id}
                  className="scroll-mt-28"
                >
                  <div
                    className={cn(
                      'card-elegant overflow-hidden grid lg:grid-cols-12 gap-0',
                      p.featured && 'ring-2 ring-gold-300/60'
                    )}
                  >
                    {/* 左侧 - 专业标题与标签 */}
                    <div
                      className={cn(
                        'relative lg:col-span-4 p-8 md:p-10 text-white overflow-hidden',
                        p.featured
                          ? 'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950'
                          : 'bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950',
                        isReversed && 'lg:order-2'
                      )}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.12]"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold-500/15 blur-3xl" />
                      <div className="relative z-10 h-full flex flex-col">
                        {/* featured 标识 */}
                        {p.featured && (
                          <div className="inline-flex self-start items-center gap-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-1 text-[11px] font-bold text-white shadow-gold mb-5">
                            <LucideIcons.Star className="h-3 w-3 fill-white" />
                            热门王牌专业
                          </div>
                        )}
                        {!p.featured && (
                          <div className="inline-flex self-start items-center gap-1 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold text-white/85 mb-5">
                            <LucideIcons.Layers className="h-3 w-3" />
                            特色专业
                          </div>
                        )}

                        <div className="text-xs font-bold text-white/70 tracking-widest mb-3">
                          PROGRAM 0{idx + 1}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-5">
                          {p.name}
                        </h3>

                        {/* 学位/学制标签 */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                            <LucideIcons.BookOpen className="h-3.5 w-3.5" />
                            {p.degree}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                            <LucideIcons.Clock className="h-3.5 w-3.5" />
                            {p.duration}
                          </span>
                        </div>

                        <div className="mt-auto pt-6">
                          <div className="text-xs text-white/60 mb-2">专业编号</div>
                          <div className="font-mono text-sm text-gold-300">#{p.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </div>

                    {/* 右侧 - 内容详情 */}
                    <div
                      className={cn(
                        'lg:col-span-8 p-8 md:p-10',
                        isReversed && 'lg:order-1'
                      )}
                    >
                      {/* 专业概述 */}
                      <div className="mb-7">
                        <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <LucideIcons.Sparkles className="h-3.5 w-3.5" />
                          专业概述
                        </div>
                        <p className="text-base text-dark-700 leading-relaxed">
                          {p.overview}
                        </p>
                      </div>

                      {/* 核心课程 */}
                      <div className="mb-7">
                        <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <LucideIcons.BookOpen className="h-3.5 w-3.5" />
                          核心课程 · 共 {p.curriculum.length} 门
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.curriculum.map((c, i) => (
                            <span
                              key={c}
                              className={cn(
                                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                                i % 3 === 0
                                  ? 'bg-primary-50 text-primary-700 border border-primary-100'
                                  : i % 3 === 1
                                  ? 'bg-gold-50 text-gold-700 border border-gold-100'
                                  : 'bg-dark-50 text-dark-700 border border-dark-100'
                              )}
                            >
                              <LucideIcons.CheckCircle className="h-3 w-3" />
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 就业方向 */}
                      <div className="border-t border-dark-100 pt-6">
                        <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <LucideIcons.Briefcase className="h-3.5 w-3.5" />
                          就业方向 · 共 {p.career.length} 个
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5">
                          {p.career.map((job, i) => (
                            <div
                              key={job}
                              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-50/60 to-transparent border border-primary-100/50 px-3 py-2"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary-600 to-primary-800 text-white text-[11px] font-bold">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-sm text-dark-800 font-medium">{job}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 培养路径 */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        </div>
        <div className="container-page relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              PATHWAY · 培养路径
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {programsConfig.cultivationPathTitle}
              <br />
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {programsConfig.cultivationPathHighlight}
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programsConfig.cultivationSteps.map((s) => {
              const Icon = iconMap[s.icon] || LucideIcons.CircleHelp;
              return (
                <div
                  key={s.id}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-gold-500/30 transition-all"
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg mb-4 group-hover:scale-110 transition-transform',
                      s.color
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xs font-bold text-gold-400 tracking-widest">
                      {s.year}
                    </div>
                    <div className="text-[10px] text-dark-500">{s.yearLabel}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <SafeHtml
                    html={s.description}
                    variant="compact"
                    className="text-sm text-dark-300 mb-4"
                  />
                  {s.highlights && s.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-white/10">
                      {s.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2 text-xs text-dark-400">
                          <LucideIcons.CheckCircle className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-primary-800 to-primary-950 p-8 md:p-14 text-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary-400/15 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {programsConfig.ctaTitle}
                <br />
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  {programsConfig.ctaHighlight}
                </span>
              </h2>
              <SafeHtml
                html={programsConfig.ctaParagraph}
                variant="body"
                className="text-white/75 text-sm md:text-base mb-8"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-gold">
                  <LucideIcons.Phone className="h-4 w-4" />
                  联系招生咨询
                </Link>
                <Link
                  href="/industry"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15"
                >
                  了解产教融合
                  <LucideIcons.ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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
