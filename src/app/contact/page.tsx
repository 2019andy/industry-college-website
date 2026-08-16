import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import SafeHtml from '@/components/SafeHtml';
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

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系中跨数字贸易产业学院，获取招生咨询、校企合作、参观预约等服务，开启您的数字贸易职业成长之旅。',
};

export default async function ContactPage() {
  const content = await getSiteContent();
  const { contactInfo } = content;
  const contact = content.contactPage;

  const contactCards = [
    {
      icon: <LucideIcons.MapPin className="h-6 w-6" />,
      label: '学院地址',
      value: contactInfo.address,
      desc: '欢迎来校参观咨询',
      color: 'from-primary-500 to-primary-700',
      bg: 'bg-primary-50',
    },
    {
      icon: <LucideIcons.Phone className="h-6 w-6" />,
      label: '招生热线',
      value: contactInfo.phone,
      desc: '工作日 9:00-18:00',
      href: `tel:${contactInfo.phone}`,
      color: 'from-green-500 to-green-700',
      bg: 'bg-green-50',
    },
    {
      icon: <LucideIcons.Mail className="h-6 w-6" />,
      label: '邮件咨询',
      value: contactInfo.email,
      desc: '24小时内回复',
      href: `mailto:${contactInfo.email}`,
      color: 'from-gold-500 to-gold-700',
      bg: 'bg-gold-50',
    },
    {
      icon: <LucideIcons.Clock className="h-6 w-6" />,
      label: '办公时间',
      value: contactInfo.workHours,
      desc: '法定节假日除外',
      color: 'from-violet-500 to-violet-700',
      bg: 'bg-violet-50',
    },
    {
      icon: <LucideIcons.MessageCircle className="h-6 w-6" />,
      label: '招生QQ群',
      value: contactInfo.qqGroup,
      desc: '加群请注明「咨询」',
      color: 'from-sky-500 to-sky-700',
      bg: 'bg-sky-50',
    },
    {
      icon: <LucideIcons.QrCode className="h-6 w-6" />,
      label: '微信公众号',
      value: contactInfo.wechatOfficial,
      desc: '关注获取最新资讯',
      color: 'from-emerald-500 to-emerald-700',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />
      <PageHero
        title={contact.banner.title}
        subtitle={contact.banner.subtitle}
        breadcrumb={contact.banner.breadcrumb}
      />

      {/* 联系信息卡片 */}
      <section className="section-padding bg-gradient-to-b from-white to-primary-50/40">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              CONTACT · 联系方式
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              {contact.infoTitle}
              <span className="heading-gradient"> {contact.infoHighlight}</span>
            </h2>
            <SafeHtml
              html={contact.infoParagraph}
              variant="prose-like"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card, i) => {
              const Comp: any = card.href ? 'a' : 'div';
              return (
                <Comp
                  key={i}
                  href={card.href}
                  className={cn(
                    'group card-elegant p-7 flex flex-col',
                    card.href && 'cursor-pointer'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg mb-5 transition-transform group-hover:scale-110',
                      card.color
                    )}
                  >
                    {card.icon}
                  </div>
                  <div className="text-xs font-semibold text-dark-500 mb-2 tracking-wider">
                    {card.label}
                  </div>
                  <div className="text-lg font-bold text-dark-900 mb-2 break-all">
                    {card.value}
                  </div>
                  <div className="text-sm text-dark-500 mt-auto">{card.desc}</div>
                </Comp>
              );
            })}
          </div>
        </div>
      </section>

      {/* 联系表单 + 地图 */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* 左侧：引导文案 + 表单 */}
            <div>
              <span className="inline-flex items-center rounded-full bg-gold-50 border border-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
                INQUIRY · 在线咨询
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-5 leading-tight">
                {contact.formTitle}
                <br />
                <span className="heading-gradient">{contact.formHighlight}</span>
              </h2>
              <SafeHtml
                html={contact.formParagraph}
                variant="prose-like"
                className="mb-8 max-w-md"
              />

              <div className="relative">
                <div className="absolute -top-3 -right-3 h-full w-full rounded-[2rem] bg-gradient-to-br from-gold-400/15 to-primary-500/15 blur-2xl" />
                <div className="relative rounded-3xl bg-white border border-dark-100 shadow-card-hover p-7 md:p-9">
                  <ContactForm successText={contact.formSuccessText} />
                </div>
              </div>
            </div>

            {/* 右侧：地图占位 + 补充信息 */}
            <div className="lg:sticky lg:top-28">
              {/* 地图占位 */}
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-dark-950 mb-6">
                {/* 网格背景 */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* 装饰光晕 */}
                <div className="absolute top-10 right-10 h-48 w-48 bg-gold-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-10 left-10 h-40 w-40 bg-primary-400/20 blur-3xl rounded-full" />

                {/* 中心标记 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gold-500/30 rounded-full blur-xl animate-pulse" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-2xl shadow-gold-500/40">
                      <LucideIcons.MapPin className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-medium text-white/90 mb-3">
                    <LucideIcons.Navigation className="h-3.5 w-3.5" />
                    {contact.mapTitle}
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">
                    {contactInfo.address}
                  </p>
                  <p className="text-white/60 text-sm mb-2">
                    坐标：{contactInfo.coordinates.lat}, {contactInfo.coordinates.lng}
                  </p>
                  {contact.mapSubtitle && (
                    <SafeHtml
                      html={contact.mapSubtitle}
                      variant="compact"
                      className="text-white/70 text-sm max-w-md"
                    />
                  )}
                </div>
              </div>

              {/* 交通指引 */}
              <div className="card-elegant p-7">
                <h3 className="text-lg font-bold text-dark-900 mb-5 flex items-center gap-2">
                  <LucideIcons.Navigation className="h-5 w-5 text-primary-600" />
                  交通指引
                </h3>
                <div className="space-y-4">
                  {contact.trafficTips.map((tip) => {
                    const Icon = iconMap[tip.icon] || LucideIcons.CircleHelp;
                    return (
                      <div key={tip.id} className="flex items-start gap-4">
                        <div
                          className={cn(
                            'shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                            tip.color
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-dark-900 mb-1">{tip.label}</div>
                          <SafeHtml
                            html={tip.content}
                            variant="compact"
                            className="text-sm text-dark-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 招生热线 */}
              <div className="mt-6 rounded-3xl bg-gradient-to-br from-gold-500 to-gold-600 p-7 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 blur-2xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <LucideIcons.Headphones className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{contact.hotlineTitle}</h3>
                      <div className="text-xs text-white/80">{contact.hotlineHours}</div>
                    </div>
                  </div>
                  <SafeHtml
                    html={contact.hotlineParagraph}
                    variant="compact"
                    className="text-white/85 text-sm mb-5"
                  />
                  <a
                    href={`tel:${contact.hotlinePhone}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-gold-700 shadow-lg hover:bg-gold-50 transition-all"
                  >
                    <LucideIcons.Phone className="h-4 w-4" />
                    {contact.hotlinePhone}
                    <LucideIcons.ArrowRight className="h-4 w-4" />
                  </a>
                </div>
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
