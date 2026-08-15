'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Briefcase, CheckCircle2, Star } from 'lucide-react';
import type { Program } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ProgramsSection({ programs }: { programs: Program[] }) {
  return (
    <section id="programs" className="section-padding bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
      <div className="absolute top-1/3 left-0 h-80 w-80 rounded-full bg-gold-50/60 blur-3xl -z-10" />
      <div className="container-page">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-gold-50 border border-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
            PROGRAMS · 专业设置
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
            四大王牌专业
            <span className="heading-gradient"> 直连数字贸易黄金赛道</span>
          </h2>
          <p className="text-base md:text-lg text-dark-600 leading-relaxed">
            专业设置紧贴行业岗位需求，课程体系每年迭代更新，确保所学即企业所用。
          </p>
        </div>

        {/* Programs grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {programs.map((p) => (
            <div
              key={p.id}
              className={cn(
                'group relative rounded-3xl p-0.5 transition-all duration-500 hover:-translate-y-1',
                p.featured
                  ? 'bg-gradient-to-br from-gold-400 via-primary-500 to-primary-700 shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30'
                  : 'bg-dark-100 hover:bg-gradient-to-br hover:from-primary-200 hover:via-primary-100 hover:to-gold-100'
              )}
            >
              <div className="relative rounded-[calc(1.5rem-2px)] bg-white p-8 lg:p-9 h-full overflow-hidden">
                {p.featured && (
                  <div className="absolute top-6 right-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-1 text-[11px] font-bold text-white shadow-gold">
                    <Star className="h-3 w-3 fill-white" />
                    热门专业
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                    <BookOpen className="h-3.5 w-3.5" />
                    {p.degree}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-dark-50 px-2.5 py-1 text-xs font-semibold text-dark-600">
                    <Clock className="h-3.5 w-3.5" />
                    {p.duration}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-dark-600 leading-relaxed mb-6">
                  {p.overview}
                </p>

                <div className="mb-6">
                  <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3">
                    核心课程
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.curriculum.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 rounded-lg bg-dark-50 px-2.5 py-1.5 text-xs text-dark-700"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary-500" />
                        {c}
                      </span>
                    ))}
                    {p.curriculum.length > 4 && (
                      <span className="inline-flex items-center rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs font-semibold text-primary-700">
                        +{p.curriculum.length - 4} 门
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-dark-100 pt-5">
                  <div className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    就业方向
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {p.career.slice(0, 3).map((job) => (
                      <span key={job} className="text-sm text-dark-700 font-medium">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/programs#${p.id}`}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700"
                >
                  查看专业详情
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/programs" className="btn-primary px-8 py-3.5">
            查看全部专业与培养方案
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
