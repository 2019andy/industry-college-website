'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, TextArea, SaveBar, StringArrayEditor } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import type { NewsPageConfig, PageBanner } from '@/lib/types';
import {
  Newspaper,
  Flag,
  BookOpen,
  Tags,
  Code2,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '新闻动态',
  subtitle: '学院资讯 · 行业热点 · 学生风采',
  breadcrumb: '首页 / 新闻动态',
};

const defaultNewsPage: NewsPageConfig = {
  banner: defaultBanner,
  listTitle: '新闻与动态',
  listHighlight: '新闻与动态',
  listParagraph: '',
  categories: ['全部', '学院新闻', '行业资讯', '学生活动', '校企合作'],
};

export default function NewsPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<NewsPageConfig>('newsPage');
  const [local, setLocal] = useState<NewsPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultNewsPage);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-dark-400">
        <svg className="h-8 w-8 animate-spin text-primary-500 mb-3" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm">加载中...</span>
      </div>
    );
  }
  if (!local) return null;

  const markDirty = () => setDirty(true);

  const patchBanner = <K extends keyof PageBanner>(key: K, value: PageBanner[K]) => {
    setLocal((prev) => (prev ? { ...prev, banner: { ...prev.banner, [key]: value } } : prev));
    markDirty();
  };

  const patch = <K extends keyof NewsPageConfig>(key: K, value: NewsPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const handleSave = async () => {
    const ok = await save(local);
    if (ok) setDirty(false);
  };

  const handleReset = () => {
    if (data) {
      setLocal(data);
    } else {
      setLocal(defaultNewsPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">新闻动态页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「新闻动态」二级页面的 Banner、标题文案、分类筛选标签等内容（具体新闻内容请在【新闻动态】独立管理）
        </p>
      </div>

      <div className="space-y-6">
        {/* Banner */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">页面顶部 Banner</h3>
              <p className="text-xs text-dark-500">页面进入时最上方的大图区域文字</p>
            </div>
          </div>
          <Field label="Banner 标题" required>
            <TextInput value={local.banner.title} onChange={(v) => patchBanner('title', v)} />
          </Field>
          <Field label="Banner 副标题">
            <TextInput value={local.banner.subtitle} onChange={(v) => patchBanner('subtitle', v)} />
          </Field>
          <Field label="面包屑文字">
            <TextInput value={local.banner.breadcrumb} onChange={(v) => patchBanner('breadcrumb', v)} />
          </Field>
        </div>

        {/* 新闻列表标题区 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">新闻列表标题区</h3>
              <p className="text-xs text-dark-500">分类标签上方的页面主标题与说明</p>
            </div>
          </div>
          <Field label="主标题" required>
            <TextInput value={local.listTitle} onChange={(v) => patch('listTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.listHighlight} onChange={(v) => patch('listHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.listParagraph}
            onChange={(v) => patch('listParagraph', v)}
            minHeight="150px"
          />
        </div>

        {/* 分类标签 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Tags className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">分类筛选标签（categories）</h3>
              <p className="text-xs text-dark-500">在新闻列表上方显示的分类筛选 Tab，第一项建议为「全部」</p>
            </div>
          </div>
          <Field label="分类标签列表" required hint="每输入一个分类名按回车添加；点击 × 删除。顺序即前端显示顺序。">
            <StringArrayEditor
              items={local.categories}
              onChange={(v) => patch('categories', v)}
              placeholder="输入分类名后按回车（例：学院新闻）"
            />
          </Field>
        </div>

        {/* 提示卡片 */}
        <div className="rounded-2xl border border-primary-100 bg-primary-50/30 p-5">
          <h4 className="font-bold text-primary-800 text-sm mb-2 flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            内容说明
          </h4>
          <ul className="text-xs text-primary-700/80 space-y-1 list-disc list-inside leading-relaxed">
            <li>新闻具体条目（标题、日期、封面、摘要、分类等）请在后台左侧菜单【站点内容 → 新闻动态】中管理。</li>
            <li>此处 categories 只是「筛选标签」，增加新分类时请同步在新闻管理中将新闻项的 category 字段设置为对应文字，否则筛选后可能为空。</li>
            <li>第一项建议保留为「全部」，用于不筛选时显示所有新闻。</li>
          </ul>
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
