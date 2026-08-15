import { Building, CreditCard, Store, Globe, Megaphone, Package, Cpu, type LucideIcon } from 'lucide-react';
import type { Partner } from '@/lib/types';
import { cn } from '@/lib/utils';

const categoryIconMap: Record<string, LucideIcon> = {
  '跨境平台': Globe,
  '社交电商': Megaphone,
  '数字营销': Megaphone,
  '独立站': Store,
  '物流仓储': Package,
  '跨境支付': CreditCard,
  '产业运营': Building,
  '人工智能': Cpu,
};

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className="section-padding bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-gold-400 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
            PARTNERS · 生态合作
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            携手
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent"> 200+ 行业头部企业</span>
            <br className="hidden sm:block" />
            共建数字贸易产业生态
          </h2>
          <p className="text-base md:text-lg text-dark-300 leading-relaxed">
            覆盖跨境平台、数字营销、国际物流、跨境支付等全产业链，确保实训场景100%还原企业真实工作环境。
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {partners.map((p) => {
            const Icon = categoryIconMap[p.category] ?? Building;
            return (
              <div
                key={p.id}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-gold-500/30 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 text-primary-400 group-hover:from-gold-500/20 group-hover:to-gold-600/20 group-hover:text-gold-400 transition-colors">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm md:text-base truncate group-hover:text-gold-300 transition-colors">
                      {p.name}
                    </div>
                    <div className={cn(
                      'text-xs mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5',
                      p.category === '跨境平台' && 'bg-primary-500/10 text-primary-400',
                      p.category === '数字营销' && 'bg-purple-500/10 text-purple-400',
                      p.category === '物流仓储' && 'bg-green-500/10 text-green-400',
                      p.category === '跨境支付' && 'bg-blue-500/10 text-blue-400',
                      p.category === '社交电商' && 'bg-pink-500/10 text-pink-400',
                      p.category === '独立站' && 'bg-cyan-500/10 text-cyan-400',
                      p.category === '产业运营' && 'bg-gold-500/10 text-gold-400',
                      p.category === '人工智能' && 'bg-indigo-500/10 text-indigo-400',
                    )}>
                      {p.category}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '200+', label: '合作企业' },
            { val: '50+', label: '行业认证' },
            { val: '3个', label: '国家级实训基地' },
            { val: '12个', label: '产业研究中心' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent mb-2 font-display tracking-tight">
                {s.val}
              </div>
              <div className="text-sm text-dark-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
