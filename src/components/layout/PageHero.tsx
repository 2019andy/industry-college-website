import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="container-page relative z-10 text-center">
        {breadcrumb && (
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white/80 mb-6">
            {breadcrumb}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
