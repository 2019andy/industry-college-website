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

const avatarColors = [
  'from-primary-500 to-primary-700',
  'from-gold-500 to-gold-700',
  'from-primary-700 to-gold-500',
  'from-gold-600 to-primary-700',
  'from-primary-600 to-primary-800',
  'from-gold-400 to-gold-600',
];

export default async function FacultyPage() {
  const content = await getSiteContent();
  const faculty = content.facultyPage;

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />

      <PageHero
        title={faculty.banner.title}
        subtitle={faculty.banner.subtitle}
        breadcrumb={faculty.banner.breadcrumb}
      />

      {/* 师资特色统计 */}
      <section className="border-y border-dark-100 bg-gradient-to-r from-primary-50/60 via-white to-gold-50/60">
        <div className="container-page py-10 md:py-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-3">
              {faculty.teamStrengthTitle}
              <span className="heading-gradient"> {faculty.teamStrengthHighlight}</span>
            </h2>
            <SafeHtml
              html={faculty.teamStrengthParagraph}
              variant="prose-like"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faculty.teamCards.map((s) => {
              const Icon = iconMap[s.icon] || LucideIcons.CircleHelp;
              return (
                <div
                  key={s.id}
                  className="group card-elegant p-6 text-center"
                >
                  <div
                    className={cn(
                      'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform mb-4',
                      s.color
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight mb-1">
                    {s.stat}
                  </div>
                  <div className="text-sm font-bold text-dark-900 mb-1">{s.label}</div>
                  <p className="text-xs text-dark-500 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 师资列表 */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold-50 blur-3xl -z-10" />

        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              FACULTY · 师资团队
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              学术带头人与
              <span className="heading-gradient"> 产业领军人物</span>
              <br />
              联合执教
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed">
              {content.facultyMembers.length}位核心师资，覆盖学术研究、企业实战、AI技术研发、跨境运营全维度，
              带领学子既看得远，也走得稳。
            </p>
          </div>

          {/* 师资卡片网格 - 2列 */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {content.facultyMembers.map((member, idx) => {
              const isFirst = idx === 0;
              const isLeader = member.title.includes('院长') || member.title.includes('带头人');
              const avatarColor = avatarColors[idx % avatarColors.length];
              const initial = member.name.charAt(0);

              return (
                <article
                  key={member.id}
                  className={cn(
                    'group relative card-elegant overflow-hidden',
                    isFirst && 'ring-2 ring-gold-300/60'
                  )}
                >
                  {/* 顶部色带 */}
                  <div
                    className={cn(
                      'h-1.5 w-full bg-gradient-to-r',
                      isFirst
                        ? 'from-gold-400 via-primary-500 to-gold-500'
                        : 'from-primary-500 via-primary-400 to-gold-400'
                    )}
                  />

                  <div className="p-7 md:p-8">
                    {/* 头部 - 头像与基本信息 */}
                    <div className="flex items-start gap-5 mb-6">
                      {/* 头像 */}
                      <div className="shrink-0 relative">
                        <div
                          className={cn(
                            'flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg font-display text-3xl font-bold group-hover:scale-105 transition-transform',
                            avatarColor
                          )}
                        >
                          {initial}
                        </div>
                        {isLeader && (
                          <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-gold ring-2 ring-white">
                            <LucideIcons.Star className="h-3.5 w-3.5 fill-white" />
                          </div>
                        )}
                      </div>

                      {/* 姓名 + 职称 */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-primary-600 tracking-widest mb-1">
                          FACULTY 0{member.id}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-dark-900 mb-1.5 group-hover:text-primary-700 transition-colors">
                          {member.name}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 border border-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                          <LucideIcons.Briefcase className="h-3 w-3" />
                          {member.title}
                        </div>
                      </div>
                    </div>

                    {/* 教育背景 */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <LucideIcons.GraduationCap className="h-3.5 w-3.5" />
                        教育背景
                      </div>
                      <div className="rounded-xl bg-gradient-to-r from-primary-50/80 to-transparent border border-primary-100/60 px-4 py-3">
                        <span className="text-sm text-dark-800 font-medium">
                          {member.education}
                        </span>
                      </div>
                    </div>

                    {/* 个人简介 */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <LucideIcons.BookOpen className="h-3.5 w-3.5" />
                        个人简介
                      </div>
                      <p className="text-sm text-dark-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* 研究方向 */}
                    <div>
                      <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <LucideIcons.Layers className="h-3.5 w-3.5" />
                        研究方向 · 共 {member.research.length} 项
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.research.map((r, i) => (
                          <span
                            key={r}
                            className={cn(
                              'inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium',
                              i % 3 === 0
                                ? 'bg-primary-50 text-primary-700 border border-primary-100'
                                : i % 3 === 1
                                ? 'bg-gold-50 text-gold-700 border border-gold-100'
                                : 'bg-dark-50 text-dark-700 border border-dark-100'
                            )}
                          >
                            <LucideIcons.Sparkles className="h-3 w-3" />
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 双师制介绍 */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="container-page relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              DUAL MENTOR · 双师制度
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {faculty.dualMentorTitle}
              <br />
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {faculty.dualMentorHighlight}
              </span>
            </h2>
            {faculty.dualMentorParagraph && (
              <SafeHtml
                html={faculty.dualMentorParagraph}
                variant="prose-like"
                className="text-dark-300"
              />
            )}
          </div>

          {/* 双师对比卡片 */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 学术导师 */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary-900/40 to-primary-950/60 backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary-500/15 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
                    <LucideIcons.GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gold-400 tracking-widest mb-1">
                      ACADEMIC MENTOR
                    </div>
                    <h3 className="text-xl font-bold text-white">{faculty.academicMentor.title}</h3>
                  </div>
                </div>
                <div className="text-sm text-gold-300 mb-3 font-medium">
                  {faculty.academicMentor.subtitle}
                </div>
                <SafeHtml
                  html={faculty.academicMentor.description}
                  variant="compact"
                  className="text-sm text-dark-300 mb-5"
                />
                <ul className="space-y-2.5">
                  {faculty.academicMentor.items.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-dark-200">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
                        <LucideIcons.ShieldCheck className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 企业导师 */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-gold-900/30 to-dark-950/60 backdrop-blur-sm p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold-500/15 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 text-white shadow-gold">
                    <LucideIcons.Building2 className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gold-400 tracking-widest mb-1">
                      INDUSTRY MENTOR
                    </div>
                    <h3 className="text-xl font-bold text-white">{faculty.industryMentor.title}</h3>
                  </div>
                </div>
                <div className="text-sm text-gold-300 mb-3 font-medium">
                  {faculty.industryMentor.subtitle}
                </div>
                <SafeHtml
                  html={faculty.industryMentor.description}
                  variant="compact"
                  className="text-sm text-dark-300 mb-5"
                />
                <ul className="space-y-2.5">
                  {faculty.industryMentor.items.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-dark-200">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                        <LucideIcons.ShieldCheck className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 招贤纳士 CTA */}
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
                {faculty.recruitmentTitle}
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  {' '}{faculty.recruitmentHighlight}
                </span>
              </h2>
              <SafeHtml
                html={faculty.recruitmentParagraph}
                variant="body"
                className="text-white/75 text-sm md:text-base mb-8"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-gold">
                  <LucideIcons.Mail className="h-4 w-4" />
                  加入师资团队
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15"
                >
                  了解学院概况
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
