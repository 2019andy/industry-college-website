'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, TextArea, Select, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, AboutHighlight } from '@/lib/types';
import { Plus, Trash2, Sparkles } from 'lucide-react';

const ICON_PRESETS = [
  'Award',
  'Building2',
  'Briefcase',
  'Users',
  'GraduationCap',
  'BookOpen',
  'Globe',
  'Rocket',
  'Target',
  'Lightbulb',
];

function iconOptions(current: string) {
  const list = [...ICON_PRESETS];
  if (current && !list.includes(current)) list.unshift(current);
  return list.map((v) => ({ label: v, value: v }));
}

export default function AboutHighlightsPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['aboutHighlights']>('aboutHighlights');
  const [local, setLocal] = useState<AboutHighlight[] | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
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

  const updateItem = (index: number, patch: Partial<AboutHighlight>) => {
    setLocal((prev) =>
      prev ? prev.map((item, i) => (i === index ? { ...item, ...patch } : item)) : prev
    );
    markDirty();
  };

  const addItem = () => {
    const newId = local.length > 0 ? Math.max(...local.map((h) => h.id)) + 1 : 1;
    setLocal((prev) => [
      ...(prev || []),
      { id: newId, title: '新亮点', description: '请输入亮点描述', icon: 'Award' },
    ]);
    markDirty();
  };

  const removeItem = (index: number) => {
    setLocal((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
    markDirty();
  };

  const handleSave = async () => {
    const ok = await save(local);
    if (ok) setDirty(false);
  };

  const handleReset = () => {
    if (data) {
      setLocal(data);
      setDirty(false);
    }
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">学院亮点</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院简介页展示的核心亮点内容</p>
      </div>

      <div className="space-y-4">
        {local.map((item, index) => (
          <div key={index} className="rounded-2xl bg-white border border-dark-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-50 text-gold-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-dark-700">
                  亮点 #{item.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                title="删除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="ID" hint="系统自动生成">
                <TextInput
                  type="number"
                  value={String(item.id)}
                  onChange={(v) => updateItem(index, { id: Number(v) || 0 })}
                />
              </Field>
              <Field label="图标" hint="对应 lucide-react 图标名称" className="sm:col-span-2">
                <Select
                  value={item.icon}
                  onChange={(v) => updateItem(index, { icon: v })}
                  options={iconOptions(item.icon)}
                />
              </Field>
            </div>

            <Field label="标题" required>
              <TextInput
                value={item.title}
                onChange={(v) => updateItem(index, { title: v })}
                placeholder="如 产教融合"
              />
            </Field>

            <Field label="描述">
              <TextArea
                value={item.description}
                onChange={(v) => updateItem(index, { description: v })}
                placeholder="亮点的详细描述..."
                rows={3}
              />
            </Field>
          </div>
        ))}

        {local.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-dark-200 p-12 text-center">
            <p className="text-sm text-dark-400">暂无亮点，点击下方按钮添加</p>
          </div>
        )}

        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/30 py-4 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all inline-flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          添加亮点
        </button>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
