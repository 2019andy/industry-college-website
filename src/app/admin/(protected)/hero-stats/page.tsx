'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, HeroStat } from '@/lib/types';
import { Plus, Trash2, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react';

export default function HeroStatsPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['heroStats']>('heroStats');
  const [local, setLocal] = useState<HeroStat[] | null>(null);
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

  const updateItem = (index: number, patch: Partial<HeroStat>) => {
    setLocal((prev) =>
      prev ? prev.map((item, i) => (i === index ? { ...item, ...patch } : item)) : prev
    );
    markDirty();
  };

  const addItem = () => {
    setLocal((prev) => [...(prev || []), { value: 0, suffix: '', label: '新统计项' }]);
    markDirty();
  };

  const removeItem = (index: number) => {
    setLocal((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
    markDirty();
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
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
        <h1 className="text-2xl font-bold text-dark-900">首页横幅统计</h1>
        <p className="text-sm text-dark-500 mt-1">管理首页横幅区域展示的核心数据指标</p>
      </div>

      <div className="space-y-4">
        {local.map((item, index) => (
          <div key={index} className="rounded-2xl bg-white border border-dark-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-50 text-gold-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-dark-700">统计项 #{index + 1}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-dark-500 hover:bg-dark-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="上移"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === local.length - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-dark-500 hover:bg-dark-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="下移"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                  title="删除"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="数值">
                <TextInput
                  type="number"
                  value={String(item.value)}
                  onChange={(v) => updateItem(index, { value: Number(v) || 0 })}
                  placeholder="如 1200"
                />
              </Field>
              <Field label="后缀" hint="如 +、万、%">
                <TextInput
                  value={item.suffix}
                  onChange={(v) => updateItem(index, { suffix: v })}
                  placeholder="如 +"
                />
              </Field>
              <Field label="标签">
                <TextInput
                  value={item.label}
                  onChange={(v) => updateItem(index, { label: v })}
                  placeholder="如 在校学生"
                />
              </Field>
            </div>

            <div className="mt-3 rounded-lg bg-dark-50 px-4 py-3 text-center">
              <span className="text-2xl font-bold text-primary-700">
                {item.value}
                {item.suffix}
              </span>
              <span className="ml-2 text-sm text-dark-500">{item.label}</span>
            </div>
          </div>
        ))}

        {local.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-dark-200 p-12 text-center">
            <p className="text-sm text-dark-400">暂无统计项，点击下方按钮添加</p>
          </div>
        )}

        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/30 py-4 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all inline-flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          添加统计项
        </button>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
