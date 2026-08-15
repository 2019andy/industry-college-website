'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field,
  TextInput,
  TextArea,
  Select,
  Toggle,
  SaveBar,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, NewsItem } from '@/lib/types';
import { Plus, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { label: '学院要闻', value: '学院要闻' },
  { label: '校企合作', value: '校企合作' },
  { label: '学生成果', value: '学生成果' },
  { label: '学术动态', value: '学术动态' },
  { label: '通知公告', value: '通知公告' },
];

export default function NewsAdminPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['newsList']>('newsList');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [dirty, setDirty] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  }, [data]);

  const update = (id: number, field: keyof NewsItem, value: any) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
    setDirty(true);
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    const newItem: NewsItem = {
      id: newId,
      category: '学院要闻',
      title: '新闻标题',
      date: new Date().toISOString().slice(0, 10),
      summary: '',
      image: '',
      featured: false,
    };
    setItems([...items, newItem]);
    setExpandedId(newId);
    setDirty(true);
  };

  const removeItem = (id: number) => {
    if (!window.confirm('确认删除该新闻？')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (expandedId === id) setExpandedId(null);
    setDirty(true);
  };

  const handleSave = () => {
    save(items);
    setDirty(false);
  };

  const handleReset = () => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-dark-400">加载中...</div>;
  }

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">新闻动态</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院新闻、通知公告等内容</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-500">共 {items.length} 条新闻</p>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> 添加新闻
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl bg-white border border-dark-100 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700 shrink-0">
                  {item.category}
                </span>
                <span className="font-semibold text-dark-900 truncate">
                  {item.title || '未命名新闻'}
                </span>
                {item.featured && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-gold-50 px-2 py-0.5 text-xs font-semibold text-gold-700 shrink-0">
                    <Star className="h-3 w-3 fill-current" /> 精选
                  </span>
                )}
                <span className="text-xs text-dark-400 shrink-0">{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-red-400 hover:text-red-600 p-1 transition-colors"
                  title="删除"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {expandedId === item.id ? (
                  <ChevronUp className="h-4 w-4 text-dark-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-dark-400" />
                )}
              </div>
            </div>

            {expandedId === item.id && (
              <div className="border-t border-dark-100 p-4">
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="新闻分类">
                    <Select
                      value={item.category}
                      onChange={(v) => update(item.id, 'category', v)}
                      options={CATEGORY_OPTIONS}
                    />
                  </Field>
                  <Field label="发布日期">
                    <TextInput
                      value={item.date}
                      onChange={(v) => update(item.id, 'date', v)}
                      type="date"
                      placeholder="YYYY-MM-DD"
                    />
                  </Field>
                </div>
                <Field label="新闻标题" required>
                  <TextInput
                    value={item.title}
                    onChange={(v) => update(item.id, 'title', v)}
                    placeholder="新闻标题"
                  />
                </Field>
                <Field label="新闻摘要">
                  <TextArea
                    value={item.summary}
                    onChange={(v) => update(item.id, 'summary', v)}
                    placeholder="新闻内容摘要"
                    rows={4}
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="封面图片URL">
                    <TextInput
                      value={item.image}
                      onChange={(v) => update(item.id, 'image', v)}
                      placeholder="https://..."
                    />
                  </Field>
                  <Field label="精选新闻">
                    <Toggle
                      checked={item.featured}
                      onChange={(v) => update(item.id, 'featured', v)}
                      label="设为精选新闻（首页推荐展示）"
                    />
                  </Field>
                </div>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-dark-400 rounded-xl bg-white border border-dashed border-dark-200">
            暂无新闻，点击右上角“添加新闻”创建
          </div>
        )}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
