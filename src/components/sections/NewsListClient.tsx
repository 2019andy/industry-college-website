'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CalendarDays, ArrowRight, Tag, Sparkles, Search } from 'lucide-react';
import type { NewsItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import SafeHtml from '@/components/SafeHtml';

const categoryStyles: Record<string, { badge: string; dot: string; accent: string }> = {
  学院要闻: {
    badge: 'bg-primary-50 text-primary-700 border-primary-100',
    dot: 'bg-primary-500',
    accent: 'from-primary-500 to-primary-700',
  },
  校企合作: {
    badge: 'bg-gold-50 text-gold-700 border-gold-100',
    dot: 'bg-gold-500',
    accent: 'from-gold-500 to-gold-700',
  },
  学生成果: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    dot: 'bg-emerald-500',
    accent: 'from-emerald-500 to-emerald-700',
  },
  学术动态: {
    badge: 'bg-violet-50 text-violet-700 border-violet-100',
    dot: 'bg-violet-500',
    accent: 'from-violet-500 to-violet-700',
  },
};

function getCategoryStyle(category: string) {
  return categoryStyles[category] ?? categoryStyles['学院要闻'];
}

interface NewsListClientProps {
  newsList: NewsItem[];
  categories: string[];
  listTitle?: string;
  listHighlight?: string;
  listParagraph?: string;
}

export default function NewsListClient({
  newsList,
  categories,
  listTitle,
  listHighlight,
  listParagraph,
}: NewsListClientProps) {
  const displayCategories = ['全部', ...categories];
  const [activeCategory, setActiveCategory] = useState('全部');

  const sorted = [...newsList].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered =
    activeCategory === '全部'
      ? sorted
      : sorted.filter((n) => n.category === activeCategory);

  const featured = filtered.filter((n) => n.featured);
  const regular = filtered.filter((n) => !n.featured);

  return (
    <div>
      {/* 标题区 */}
      {(listTitle || listParagraph) && (
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5">
            NEWS · 新闻动态
          </span>
          {listTitle && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              {listTitle}
              {listHighlight && (
                <span className="heading-gradient"> {listHighlight}</span>
              )}
            </h2>
          )}
          {listParagraph && (
            <SafeHtml
              html={listParagraph}
              variant="prose-like"
            />
          )}
        </div>
      )}

      {/* 分类筛选 */}
      <div className="flex flex-col items-center mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-white border border-dark-100 shadow-card">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25'
                  : 'text-dark-600 hover:text-primary-700 hover:bg-primary-50'
              )}
            >
              {cat === '全部' && <Sparkles className="h-3.5 w-3.5" />}
              {cat}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-dark-500">
          共 <span className="font-bold text-primary-700">{filtered.length}</span> 条资讯
        </p>
      </div>

      {/* Featured 新闻 - 大卡片 */}
      {featured.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {featured.map((n) => {
            const style = getCategoryStyle(n.category);
            return (
              <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="group relative card-elegant overflow-hidden flex flex-col"
              >
                {/* 顶部渐变装饰区 */}
                <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', style.accent)}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-dark-800 shadow-sm">
                    <Sparkles className="h-3 w-3 text-gold-500" />
                    重点推荐
                  </span>
                </div>

                {/* 内容区 */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={cn('inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[11px] font-bold', style.badge)}>
                      <Tag className="h-3 w-3" />
                      {n.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-dark-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {n.date}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-dark-900 mb-3 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-dark-600 leading-relaxed line-clamp-3 mb-5 flex-1">
                    {n.summary}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                    阅读全文
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 普通新闻列表 */}
      {regular.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {regular.map((n) => {
            const style = getCategoryStyle(n.category);
            return (
              <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="group card-elegant p-6 flex gap-5"
              >
                {/* 日期色块 */}
                <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-dark-50 to-dark-100 border border-dark-100">
                  <span className="text-lg font-bold text-dark-800 leading-none">
                    {new Date(n.date).getDate()}
                  </span>
                  <span className="text-[10px] text-dark-500 mt-1">
                    {new Date(n.date).toLocaleDateString('zh-CN', { month: 'short' })}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold', style.badge)}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
                      {n.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-dark-900 mb-2 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-dark-600 leading-relaxed line-clamp-2 mb-3 flex-1">
                    {n.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-500">{n.date}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                      阅读全文
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 空状态 */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dark-50 text-dark-300 mb-5">
            <Search className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-dark-800 mb-2">暂无相关资讯</h3>
          <p className="text-dark-500 text-sm">该分类下暂时没有新闻内容，请查看其他分类</p>
        </div>
      )}
    </div>
  );
}
