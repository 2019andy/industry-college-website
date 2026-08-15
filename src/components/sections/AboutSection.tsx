'use client';

import { Award, Building2, Briefcase, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { AboutHighlight } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

export default function AboutSection({ aboutHighlights }: { aboutHighlights: AboutHighlight[] }) {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl -z-10" />
      <div className="container-page">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
            ABOUT US · 学院简介
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
            为什么选择
            <span className="heading-gradient"> 中跨数字贸易产业学院</span>
          </h2>
          <p className="text-base md:text-lg text-dark-600 leading-relaxed">
            我们不只是传授知识，而是通过产教深度融合的模式，为每位学子量身打造通往数字贸易行业金字塔尖的成长路径。
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutHighlights.map((item, idx) => (
            <div
              key={item.id}
              className="group relative card-elegant p-7 overflow-hidden"
            >
              <div className={cn(
                'absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                idx === 0 && 'from-primary-500 via-gold-400 to-primary-600',
                idx === 1 && 'from-gold-400 via-primary-500 to-gold-500',
                idx === 2 && 'from-primary-600 via-primary-500 to-gold-400',
                idx === 3 && 'from-gold-500 via-primary-600 to-primary-500',
              )} />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-5 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon]}
                </div>
                <div className="text-sm font-bold text-primary-600 mb-2 tracking-wider">
                  0{item.id}
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 p-8 md:p-12">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                深度了解学院办学理念与发展历程
              </h3>
              <p className="text-white/75 text-sm md:text-base">
                国家级示范产业学院建设单位 · 跨境电商人才培养标杆院校
              </p>
            </div>
            <Link href="/about" className="btn-gold shrink-0">
              了解更多
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
