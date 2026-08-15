'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, ArrowRight, Tag } from 'lucide-react';
import type { NewsItem } from '@/lib/types';

export default function NewsSection({ newsList }: { newsList: NewsItem[] }) {
  const featured = newsList.find((n) => n.featured) ?? newsList[0];
  const others = newsList.filter((n) => n.id !== featured.id);

  return (
    <section id="news" className="section-padding relative">
      <div className="container-page">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
              NEWS · 新闻动态
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 leading-tight">
              学院
              <span className="heading-gradient">最新动态</span>
            </h2>
          </div>
          <Link href="/news" className="btn-secondary shrink-0 self-start md:self-end">
            查看全部动态
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured */}
          <Link
            href={`/news/${featured.id}`}
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden card-elegant p-0 h-[420px] lg:h-auto"
          >
            <Image
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=grand%20opening%20ceremony%20of%20a%20modern%20digital%20trade%20industrial%20college%2C%20university%20officials%20and%20business%20leaders%20unveiling%20a%20plaque%2C%20red%20ribbon%2C%20professional%20event%20photography%2C%20elegant%20venue%20decor%2C%20premium%20lighting&image_size=landscape_16_9"
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white">
                  <Tag className="h-3 w-3" />
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] text-white/90">
                  <CalendarDays className="h-3 w-3" />
                  {featured.date}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-gold-300 transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm md:text-base text-white/75 line-clamp-2 md:line-clamp-3 mb-5 max-w-2xl">
                {featured.summary}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gold-400">
                阅读全文
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Others */}
          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-5">
            {others.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="group card-elegant p-5 md:p-6 flex gap-4 md:gap-5"
              >
                <div className="relative shrink-0 h-24 w-24 md:h-28 md:w-28 rounded-xl overflow-hidden bg-primary-50">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-gold-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 backdrop-blur text-primary-600 shadow-sm">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold rounded-md bg-primary-50 px-2 py-0.5 text-primary-700">
                      {n.category}
                    </span>
                    <span className="text-xs text-dark-500">{n.date}</span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-dark-900 line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors leading-snug">
                    {n.title}
                  </h4>
                  <p className="text-xs md:text-sm text-dark-600 line-clamp-2 leading-relaxed mt-auto">
                    {n.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
