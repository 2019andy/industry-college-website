import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  Music,
  Linkedin,
} from 'lucide-react';
import type { NavItem, ContactInfo, SocialLink } from '@/lib/types';
import { cn } from '@/lib/utils';

const socialIcons: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  Twitter: <Music className="h-5 w-5" />,
  Music: <Music className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
};

export default function Footer({ navigation, contactInfo, socialLinks }: { navigation: NavItem[]; contactInfo: ContactInfo; socialLinks: SocialLink[] }) {
  const mainNav = navigation.filter((n) => !['首页', '联系我们'].includes(n.label));
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-950 text-dark-200 pt-20 pb-8 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-600/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-page relative">
        {/* Top section - CTA */}
        <div className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-br from-primary-900/40 via-dark-900/60 to-gold-900/20 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/20 px-3 py-1 text-xs font-medium text-gold-400 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                2026年招生进行中
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                加入中跨数字贸易产业学院
                <br />
                <span className="bg-gradient-to-r from-gold-400 to-gold-200 bg-clip-text text-transparent">
                  开启您的全球化职业旅程
                </span>
              </h3>
              <p className="text-dark-300 text-sm md:text-base max-w-lg">
                国家级现代产业学院，校企双主体协同育人，真实项目驱动学习，让您在校期间即积累实战经验。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-end gap-3">
              <Link href="/programs" className="btn-primary justify-center">
                查看专业设置
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary justify-center !bg-white/5 !text-white !border-white/20 hover:!bg-white/10">
                预约参观
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
                <span className="font-display text-xl font-bold tracking-tight">中</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white">中跨数字贸易产业学院</span>
                <span className="text-[11px] text-gold-400 tracking-widest font-medium">
                  ZHONGKUAN · DIGITAL TRADE
                </span>
              </div>
            </Link>
            <p className="text-sm text-dark-400 mb-6 leading-relaxed max-w-xs">
              国家级现代产业学院，由高校与中跨集团深度共建，专注数字贸易领域高素质应用型人才培养。
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5 shrink-0" />
                <span className="text-dark-300">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-400 shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-dark-300 hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-dark-300 hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary-400 shrink-0" />
                <span className="text-dark-300">{contactInfo.workHours}</span>
              </div>
            </div>
          </div>

          {/* Nav groups */}
          {mainNav.map((group) => (
            <div key={group.href}>
              <h4 className="text-white font-semibold mb-4 text-sm">{group.label}</h4>
              <ul className="space-y-2.5">
                {group.children ? (
                  group.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="text-sm text-dark-400 hover:text-gold-400 transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link
                      href={group.href}
                      className="text-sm text-dark-400 hover:text-gold-400 transition-colors"
                    >
                      {group.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">关注我们</h4>
            <div className="flex gap-2.5 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-dark-300 hover:text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/20 transition-all"
                >
                  {socialIcons[s.icon]}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="text-xs text-dark-400 mb-1">官方公众号</div>
                <div className="text-gold-400 text-sm font-semibold">{contactInfo.wechatOfficial}</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="text-xs text-dark-400 mb-1">招生咨询QQ群</div>
                <div className="text-gold-400 text-sm font-semibold">{contactInfo.qqGroup}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dark-500">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {currentYear} 中跨数字贸易产业学院 版权所有</span>
            <a href="#" className="hover:text-dark-300">粤ICP备XXXXXXXX号</a>
            <a href="#" className="hover:text-dark-300">粤公网安备 XXXXXXXXXXXXX号</a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/about#intro" className="hover:text-dark-300">关于我们</Link>
            <Link href="/contact" className="hover:text-dark-300">联系我们</Link>
            <a href="#" className="hover:text-dark-300">隐私政策</a>
            <a href="#" className="hover:text-dark-300">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
