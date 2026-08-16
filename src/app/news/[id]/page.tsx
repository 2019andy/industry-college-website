import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import {
  CalendarDays,
  Tag,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Share2,
  Clock,
  FileQuestion,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// 分类对应的色彩主题
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await getSiteContent();

  // 按日期降序排序，用于上一篇/下一篇导航
  const sortedNews = [...content.newsList].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const currentIndex = sortedNews.findIndex((n) => n.id === Number(id));
  const news = currentIndex !== -1 ? sortedNews[currentIndex] : null;

  // 上一篇（更新的）和下一篇（更旧的）
  const prevNews = currentIndex > 0 ? sortedNews[currentIndex - 1] : null;
  const nextNews =
    currentIndex !== -1 && currentIndex < sortedNews.length - 1
      ? sortedNews[currentIndex + 1]
      : null;

  // 新闻不存在 - 显示 404 提示
  if (!news) {
    return (
      <main className="min-h-screen bg-white">
        <Header navigation={content.navigation} />
        <PageHero title="内容未找到" breadcrumb="首页 / 新闻动态 / 详情" />
        <section className="section-padding">
          <div className="container-page">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-dark-50 text-dark-300 mx-auto mb-8">
                <FileQuestion className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold text-dark-900 mb-4">
                抱歉，您访问的新闻不存在
              </h2>
              <p className="text-dark-600 mb-8 leading-relaxed">
                该新闻可能已被删除或链接有误，请返回新闻列表查看更多资讯。
              </p>
              <Link href="/news" className="btn-primary">
                <ArrowLeft className="h-4 w-4" />
                返回新闻列表
              </Link>
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

  const style = getCategoryStyle(news.category);

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />
      <PageHero title={news.title} breadcrumb="首页 / 新闻动态 / 详情" />

      <section className="section-padding bg-gradient-to-b from-white via-primary-50/20 to-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-dark-600 hover:text-primary-700 transition-colors mb-8 group"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-dark-100 shadow-sm group-hover:border-primary-300 group-hover:bg-primary-50 transition-all">
                <ChevronLeft className="h-4 w-4" />
              </span>
              返回新闻列表
            </Link>

            {/* 文章头部 */}
            <article className="card-elegant p-8 md:p-12 mb-8">
              {/* 分类与元信息 */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-bold',
                    style.badge
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
                  <Tag className="h-3 w-3" />
                  {news.category}
                </span>
                {news.featured && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-gold-200 bg-gold-50 px-3 py-1 text-xs font-bold text-gold-700">
                    <Sparkles className="h-3 w-3" />
                    重点推荐
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-dark-500 mb-8 pb-8 border-b border-dark-100">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  发布日期：{news.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  来源：中跨数字贸易产业学院
                </span>
              </div>

              {/* 封面装饰区 */}
              <div
                className={cn(
                  'relative h-64 md:h-80 rounded-2xl bg-gradient-to-br overflow-hidden mb-10 flex items-center justify-center',
                  style.accent
                )}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute top-0 right-0 h-48 w-48 bg-white/10 blur-3xl rounded-full" />
                <div className="relative z-10 text-center px-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white/90 text-sm font-medium tracking-wider">
                    中跨数字贸易产业学院 · {news.category}
                  </p>
                </div>
              </div>

              {/* 正文内容 */}
              <div className="prose-content">
                <p className="text-lg md:text-xl text-dark-800 leading-relaxed font-medium mb-6">
                  {news.summary}
                </p>
                <p className="text-base text-dark-600 leading-relaxed mb-6">
                  中跨数字贸易产业学院始终秉持「AI赋能产教融合」的办学理念，致力于将产业前沿实践融入教学全过程。本次{news.category}相关动态，充分体现了学院在数字贸易领域人才培养方面的持续探索与深耕。
                </p>
                <p className="text-base text-dark-600 leading-relaxed mb-6">
                  学院通过与行业头部企业深度合作，构建了「校企双主体协同育人」的创新模式，让每一位学子都能在校期间接触到真实业务场景，积累宝贵的实战经验。我们坚信，只有将课堂学习与产业实践紧密结合，才能培养出真正符合数字经济时代发展需求的高素质应用型人才。
                </p>
                <p className="text-base text-dark-600 leading-relaxed">
                  未来，学院将继续深化产教融合，拓展校企合作广度与深度，为广大学子提供更优质的教育资源与更广阔的发展平台，助力每一位学生实现职业成长与人生价值。
                </p>
              </div>

              {/* 分享与标签 */}
              <div className="mt-10 pt-8 border-t border-dark-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-dark-500">标签：</span>
                  <span className={cn('inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold', style.badge)}>
                    {news.category}
                  </span>
                  <span className="inline-flex items-center rounded-md border border-dark-200 bg-dark-50 px-2.5 py-0.5 text-xs font-semibold text-dark-600">
                    数字贸易
                  </span>
                  <span className="inline-flex items-center rounded-md border border-dark-200 bg-dark-50 px-2.5 py-0.5 text-xs font-semibold text-dark-600">
                    产业学院
                  </span>
                </div>
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-dark-600 hover:text-primary-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                  分享
                </button>
              </div>
            </article>

            {/* 上一篇 / 下一篇导航 */}
            <nav className="grid sm:grid-cols-2 gap-4">
              {prevNews ? (
                <Link
                  href={`/news/${prevNews.id}`}
                  className="group card-elegant p-5 flex items-center gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <ChevronLeft className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-dark-500 mb-1">上一篇</div>
                    <div className="text-sm font-bold text-dark-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
                      {prevNews.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="card-elegant p-5 flex items-center gap-4 opacity-50">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dark-50 text-dark-400">
                    <ChevronLeft className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-dark-500 mb-1">上一篇</div>
                    <div className="text-sm font-medium text-dark-400">已是最新一篇</div>
                  </div>
                </div>
              )}

              {nextNews ? (
                <Link
                  href={`/news/${nextNews.id}`}
                  className="group card-elegant p-5 flex items-center gap-4 sm:flex-row-reverse sm:text-right"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700 group-hover:bg-gold-600 group-hover:text-white transition-all">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-dark-500 mb-1">下一篇</div>
                    <div className="text-sm font-bold text-dark-900 line-clamp-1 group-hover:text-gold-700 transition-colors">
                      {nextNews.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="card-elegant p-5 flex items-center gap-4 sm:flex-row-reverse sm:text-right opacity-50">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dark-50 text-dark-400">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-dark-500 mb-1">下一篇</div>
                    <div className="text-sm font-medium text-dark-400">已是最后一篇</div>
                  </div>
                </div>
              )}
            </nav>

            {/* 底部 CTA */}
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-10 text-center overflow-hidden relative">
              <div className="absolute top-0 right-0 h-40 w-40 bg-gold-500/20 blur-3xl rounded-full" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3">关注学院更多动态</h3>
                <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                  了解中跨数字贸易产业学院的最新资讯、校企合作与学生成果
                </p>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg hover:bg-gold-50 hover:text-gold-700 transition-all"
                >
                  查看全部新闻
                  <ArrowRight className="h-4 w-4" />
                </Link>
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
