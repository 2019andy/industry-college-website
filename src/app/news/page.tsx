import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import PageHero from '@/components/layout/PageHero';
import NewsListClient from '@/components/sections/NewsListClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '新闻动态',
  description: '了解中跨数字贸易产业学院最新资讯与行业动态，包括学院要闻、校企合作、学生成果、学术动态等。',
};

export default async function NewsPage() {
  const content = await getSiteContent();
  const newsConfig = content.newsPage;

  return (
    <main className="min-h-screen bg-white">
      <Header navigation={content.navigation} />
      <PageHero
        title={newsConfig.banner.title}
        subtitle={newsConfig.banner.subtitle}
        breadcrumb={newsConfig.banner.breadcrumb}
      />

      <section className="section-padding bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="container-page">
          <NewsListClient
            newsList={content.newsList}
            categories={newsConfig.categories}
            listTitle={newsConfig.listTitle}
            listHighlight={newsConfig.listHighlight}
            listParagraph={newsConfig.listParagraph}
          />
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
