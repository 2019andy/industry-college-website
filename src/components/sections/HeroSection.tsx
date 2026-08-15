'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle, GraduationCap, Briefcase, Globe, TrendingUp, Cpu } from 'lucide-react';
import type { HeroStat } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

export default function HeroSection({ heroStats }: { heroStats: HeroStat[] }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero-gradient pt-28 pb-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute top-10 right-1/4 h-40 w-40 rounded-full bg-white/5 blur-2xl animate-float" />
      </div>

      {/* Container */}
      <div className="container-page relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Left: Content */}
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            国家级现代产业学院 · AI赋能产教融合
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
            <span className="block">AI驱动</span>
            <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              产教融合
            </span>
            <span className="block">培育数字经济人才</span>
          </h1>

          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mb-10">
            中跨数字贸易产业学院，由高校与中跨集团深度共建。聚焦人工智能与跨境电商两大核心方向，
            以AI技术赋能真实产业项目驱动教学，校企双导师联合授课，让您在毕业时即拥有2年+行业实战经验。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-14">
            <Link href="/programs" className="btn-gold text-base px-8 py-4">
              探索专业方向
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/15 transition-all"
            >
              <PlayCircle className="h-5 w-5 text-gold-400" />
              观看学院介绍
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {heroStats.map((s, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -top-2 -left-1 h-8 w-8 rounded-lg bg-gradient-to-br from-gold-400/30 to-gold-500/0 blur-sm" />
                <div className="relative">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white">
                      {formatNumber(s.value)}
                    </span>
                    <span className="text-gold-400 font-bold">{s.suffix}</span>
                  </div>
                  <div className="text-xs md:text-sm text-white/60">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative hidden lg:block">
          <div className="absolute -top-6 -left-6 h-full w-full rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-sm" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
            <Image
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20digital%20trade%20college%20campus%20building%20with%20glass%20facade%2C%20students%20collaborating%20with%20laptops%20showing%20global%20e-commerce%20data%20dashboards%2C%20professional%20atmosphere%2C%20warm%20golden%20hour%20lighting%2C%20high-end%20architectural%20photography%2C%20premium%20feel&image_size=portrait_4_3"
              alt="中跨数字贸易产业学院"
              width={900}
              height={1100}
              className="w-full h-[580px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
          </div>

          {/* Floating cards */}
          <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-4 shadow-2xl shadow-black/20 border border-dark-100 w-64 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xs text-dark-500">就业保障</div>
                <div className="text-sm font-bold text-dark-900">名企直推</div>
              </div>
            </div>
            <div className="text-xs text-dark-600">与200+头部企业建立就业合作通道</div>
          </div>

          <div className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-2xl shadow-black/20 border border-dark-100 w-64 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xs text-dark-500">全球视野</div>
                <div className="text-sm font-bold text-dark-900">跨境实战</div>
              </div>
            </div>
            <div className="text-xs text-dark-600">对接Amazon/eBay/TikTok等全球平台</div>
          </div>

          <div className="absolute top-1/2 -right-10 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 shadow-2xl shadow-primary-900/40 border border-primary-400/30 w-56 text-white animate-float" style={{ animationDelay: '2.5s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-gold-300">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xs text-white/70">薪资水平</div>
                <div className="text-sm font-bold">毕业生平均起薪12K+</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <GraduationCap className="h-4 w-4 text-gold-400 shrink-0" />
              <span className="text-white/80">三年晋升管理层比率超40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 text-xs">
        <span className="tracking-widest">SCROLL</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
