import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import SafeHtml from '@/components/SafeHtml';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Partner } from '@/lib/types';

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

const {
  Building: BuildingIcon,
  CreditCard,
  Megaphone,
  Package,
  Server,
  Activity,
  Ruler,
  Globe,
  Store,
  Cpu,
  Handshake,
  Briefcase,
  Users,
} = LucideIcons;

const categoryIconMap: Record<string, React.ComponentType<{className?: string}>> = {
  '跨境平台': Globe,
  '社交电商': Megaphone,
  '数字营销': Megaphone,
  '独立站': Store,
  '物流仓储': Package,
  '跨境支付': CreditCard,
  '产业运营': BuildingIcon,
  '人工智能': Cpu,
};

const categoryStyleMap: Record<string, { bg: string; text: string; ring: string }> = {
  '跨境平台': { bg: 'bg-primary-50', text: 'text-primary-700', ring: 'ring-primary-100' },
  '数字营销': { bg: 'bg-purple-50', text: 'text-purple-700', ring: 'ring-purple-100' },
  '物流仓储': { bg: 'bg-green-50', text: 'text-green-700', ring: 'ring-green-100' },
  '跨境支付': { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-100' },
  '社交电商': { bg: 'bg-pink-50', text: 'text-pink-700', ring: 'ring-pink-100' },
  '独立站': { bg: 'bg-cyan-50', text: 'text-cyan-700', ring: 'ring-cyan-100' },
  '产业运营': { bg: 'bg-gold-50', text: 'text-gold-700', ring: 'ring-gold-100' },
  '人工智能': { bg: 'bg-indigo-50', text: 'text-indigo-700', ring: 'ring-indigo-100' },
};

const baseIconMap: Record<number, React.ComponentType<{className?: string}>> = {
  1: Store,
  2: Megaphone,
  3: Package,
  4: Cpu,
};

function groupByCategory(partners: Partner[]) {
  const groups: Record<string, Partner[]> = {};
  partners.forEach((p) => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return groups;
}

export default async function IndustryPage() {
  const content = await getSiteContent();
  const industry = content.industryPage;
  const partnerGroups = groupByCategory(content.partners);

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />

      <PageHero
        title={industry.banner.title}
        subtitle={industry.banner.subtitle}
        breadcrumb={industry.banner.breadcrumb}
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
          {[
            { label: '合作企业', href: '#partners', icon: Handshake },
            { label: '实训基地', href: '#training', icon: Server },
            { label: '校企项目', href: '#projects', icon: Activity },
            { label: '就业服务', href: '#careers', icon: Briefcase },
          ].map((t) => {
            const NavIcon = t.icon;
            return (
              <a
                key={t.label}
                href={t.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 font-medium text-white/85 hover:bg-white/15 hover:text-white transition-colors"
              >
                <NavIcon className="h-3.5 w-3.5" />
                {t.label}
              </a>
            );
          })}
        </div>
      </PageHero>

      {/* 合作企业 */}
      <section id="partners" className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              PARTNERS · 合作企业
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              携手200+行业头部企业
              <span className="heading-gradient"> 共建产教融合生态</span>
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed">
              合作覆盖跨境平台、数字营销、物流仓储、跨境支付、人工智能等全产业链，
              确保实训场景100%还原企业真实工作环境。
            </p>
          </div>

          {/* 按分类分组展示 */}
          <div className="space-y-10">
            {Object.entries(partnerGroups).map(([category, list]) => {
              const CatIcon = categoryIconMap[category] ?? BuildingIcon;
              const style = categoryStyleMap[category] ?? categoryStyleMap['产业运营'];
              return (
                <div key={category}>
                  {/* 分组标题 */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        style.bg,
                        style.text
                      )}
                    >
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-900">{category}</h3>
                      <div className="text-xs text-dark-500">
                        共 {list.length} 家合作企业
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-dark-100 to-transparent ml-2" />
                  </div>

                  {/* 企业网格 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {list.map((p) => {
                      const ItemIcon = categoryIconMap[p.category] ?? BuildingIcon;
                      return (
                        <div
                          key={p.id}
                          className="group relative card-elegant p-5 overflow-hidden"
                        >
                          <div
                            className={cn(
                              'absolute top-0 left-0 h-full w-1 ring-1 rounded-l-2xl',
                              style.bg,
                              style.ring
                            )}
                          />
                          <div className="relative pl-2">
                            <div
                              className={cn(
                                'inline-flex h-9 w-9 items-center justify-center rounded-lg mb-3',
                                style.bg,
                                style.text
                              )}
                            >
                              <ItemIcon className="h-4.5 w-4.5" />
                            </div>
                            <div className="text-sm font-semibold text-dark-900 group-hover:text-primary-700 transition-colors truncate">
                              {p.name}
                            </div>
                            <div
                              className={cn(
                                'inline-flex items-center mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded',
                                style.bg,
                                style.text
                              )}
                            >
                              {p.category}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 实训基地 */}
      <section
        id="training"
        className="section-padding bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden"
      >
        <div className="absolute top-1/3 left-0 h-72 w-72 rounded-full bg-gold-100/50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-gold-50 border border-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              TRAINING BASES · 实训基地
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              四大企业级实训基地
              <span className="heading-gradient"> 让学习即上岗</span>
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed">
              总面积超过9000㎡，配备企业级真实业务系统与算力平台，学生在校即可操作真实跨境店铺、投放真实广告、训练真实大模型。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {content.trainingBases.map((base, idx) => {
              const BaseIcon = baseIconMap[base.id] ?? Server;
              return (
                <div
                  key={base.id}
                  className="group relative card-elegant overflow-hidden"
                >
                  {/* 顶部色带 */}
                  <div
                    className={cn(
                      'h-1.5 w-full bg-gradient-to-r',
                      idx % 4 === 0 && 'from-primary-500 via-gold-400 to-primary-600',
                      idx % 4 === 1 && 'from-gold-400 via-primary-500 to-gold-500',
                      idx % 4 === 2 && 'from-primary-600 via-primary-500 to-gold-400',
                      idx % 4 === 3 && 'from-gold-500 via-primary-600 to-primary-500'
                    )}
                  />
                  <div className="p-7 md:p-8">
                    {/* 头部 */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
                          <BaseIcon className="h-7 w-7" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-primary-600 tracking-wider mb-1">
                            BASE 0{base.id}
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-dark-900 group-hover:text-primary-700 transition-colors">
                            {base.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* 面积、工位统计 */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="rounded-xl bg-primary-50 border border-primary-100 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-primary-700 font-semibold mb-1">
                          <Ruler className="h-3.5 w-3.5" />
                          占地面积
                        </div>
                        <div className="text-lg font-bold text-dark-900">{base.area}</div>
                      </div>
                      <div className="rounded-xl bg-gold-50 border border-gold-100 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-gold-700 font-semibold mb-1">
                          <Users className="h-3.5 w-3.5" />
                          工位规模
                        </div>
                        <div className="text-lg font-bold text-dark-900">{base.seats}</div>
                      </div>
                    </div>

                    {/* 系统列表 */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Server className="h-3.5 w-3.5" />
                        配套系统 · 共 {base.systems.length} 套
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {base.systems.map((s, i) => (
                          <div
                            key={s}
                            className="flex items-center gap-2 rounded-lg bg-dark-50/60 border border-dark-100/60 px-3 py-2"
                          >
                            <LucideIcons.CheckCircle className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                            <span className="text-xs text-dark-700 font-medium">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-sm text-dark-600 leading-relaxed border-t border-dark-100 pt-4">
                      {base.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 校企项目 - 合作模式 */}
      <section id="projects" className="section-padding bg-dark-950 relative overflow-hidden">
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
              COOPERATION · 校企项目
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {industry.projectTitle}
              <br />
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {industry.projectHighlight}
              </span>
            </h2>
            <SafeHtml
              html={industry.projectParagraph}
              variant="prose-like"
              className="text-dark-300"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {industry.projectModes.map((m, idx) => {
              const Icon = iconMap[m.icon] || LucideIcons.CircleHelp;
              return (
                <div
                  key={m.id}
                  className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 md:p-8 overflow-hidden hover:bg-white/[0.06] hover:border-gold-500/30 transition-all"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gold-500/5 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={cn(
                          'flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform',
                          m.color
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="text-5xl font-bold font-display text-white/[0.06] tracking-tight">
                        0{idx + 1}
                      </div>
                    </div>
                    <SafeHtml
                      html={m.subtitle}
                      variant="compact"
                      className="text-xs font-bold text-gold-400 tracking-wider mb-2"
                    />
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{m.title}</h3>
                    <SafeHtml
                      html={m.description}
                      variant="compact"
                      className="text-sm text-dark-300 mb-5"
                    />
                    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {m.tags.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-dark-200"
                        >
                          <LucideIcons.CheckCircle className="h-3 w-3 text-gold-400" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 就业服务 */}
      <section id="careers" className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary-50 blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-50 blur-3xl -z-10" />
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              CAREERS · 就业服务
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              {industry.careerTitle}
              <span className="heading-gradient"> {industry.careerHighlight}</span>
            </h2>
            <SafeHtml
              html={industry.careerParagraph}
              variant="prose-like"
            />
          </div>

          {/* 就业数据 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {industry.careerStats.map((s) => {
              const Icon = iconMap[s.icon] || LucideIcons.CircleHelp;
              return (
                <div key={s.id} className="card-elegant p-6 text-center">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg mb-4',
                      s.color
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold heading-gradient font-display tracking-tight mb-1">
                    {s.stat}
                  </div>
                  <div className="text-sm font-semibold text-dark-900 mb-2">{s.label}</div>
                  <SafeHtml
                    html={s.description}
                    variant="compact"
                    className="text-xs text-dark-500"
                  />
                </div>
              );
            })}
          </div>

          {/* 就业服务流程 */}
          <div className="card-elegant p-7 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-dark-900 mb-2">
              五步职业成长护航
            </h3>
            <p className="text-sm text-dark-600 mb-8">
              从入学到就业，每个关键节点都有专属导师相伴。
            </p>
            <div className="grid md:grid-cols-5 gap-4 md:gap-2">
              {industry.careerSteps.map((s, i) => {
                const StepIcon = iconMap[s.icon] || LucideIcons.CircleHelp;
                return (
                  <div key={s.id} className="relative">
                    <div className="flex items-center gap-3 md:flex-col md:items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                        <StepIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary-600 tracking-wider mb-1">
                          {s.stepLabel}
                        </div>
                        <div className="text-sm font-bold text-dark-900">{s.title}</div>
                        <SafeHtml
                          html={s.description}
                          variant="compact"
                          className="text-xs text-dark-500"
                        />
                      </div>
                    </div>
                    {i < industry.careerSteps.length - 1 && (
                      <div className="hidden md:block absolute top-5 left-[2.5rem] right-0 h-px bg-gradient-to-r from-primary-200 to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary">
                <LucideIcons.Phone className="h-4 w-4" />
                联系就业服务中心
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50"
              >
                查看专业设置
                <LucideIcons.ArrowRight className="h-4 w-4" />
              </Link>
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
