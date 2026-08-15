'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field,
  TextInput,
  TextArea,
  StringArrayEditor,
  Toggle,
  SaveBar,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, Program } from '@/lib/types';
import { Plus, Trash2, ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function ProgramsAdminPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['programs']>('programs');
  const [items, setItems] = useState<Program[]>([]);
  const [dirty, setDirty] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  }, [data]);

  const update = (id: string, field: keyof Program, value: any) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
    setDirty(true);
  };

  const generateId = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const base = slug || `program-${items.length + 1}`;
    let candidate = base;
    let i = 1;
    while (items.some((it) => it.id === candidate)) {
      candidate = `${base}-${i}`;
      i++;
    }
    return candidate;
  };

  const addItem = () => {
    const newId = generateId('新专业');
    const newItem: Program = {
      id: newId,
      name: '新专业',
      degree: '本科',
      duration: '四年',
      overview: '',
      curriculum: [],
      career: [],
      featured: false,
    };
    setItems([...items, newItem]);
    setExpandedId(newId);
    setDirty(true);
  };

  const removeItem = (id: string) => {
    if (!window.confirm('确认删除该专业？')) return;
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
        <h1 className="text-2xl font-bold text-dark-900">专业管理</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院开设的专业方向、课程体系与就业方向</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-500">共 {items.length} 个专业</p>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> 添加专业
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
                <span className="font-semibold text-dark-900 truncate">
                  {item.name || '未命名专业'}
                </span>
                {item.featured && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-gold-50 px-2 py-0.5 text-xs font-semibold text-gold-700 shrink-0">
                    <Star className="h-3 w-3 fill-current" /> 特色
                  </span>
                )}
                <span className="text-xs text-dark-400 shrink-0">{item.degree}</span>
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
                  <Field label="专业ID" required hint="唯一标识，建议使用拼音或英文短横线格式">
                    <TextInput
                      value={item.id}
                      onChange={(v) => update(item.id, 'id', v)}
                      placeholder="如 e-commerce"
                    />
                  </Field>
                  <Field label="专业名称" required>
                    <TextInput
                      value={item.name}
                      onChange={(v) => update(item.id, 'name', v)}
                      placeholder="如 跨境电子商务"
                    />
                  </Field>
                  <Field label="学位">
                    <TextInput
                      value={item.degree}
                      onChange={(v) => update(item.id, 'degree', v)}
                      placeholder="如 本科"
                    />
                  </Field>
                  <Field label="学制">
                    <TextInput
                      value={item.duration}
                      onChange={(v) => update(item.id, 'duration', v)}
                      placeholder="如 四年"
                    />
                  </Field>
                </div>
                <Field label="专业概述">
                  <TextArea
                    value={item.overview}
                    onChange={(v) => update(item.id, 'overview', v)}
                    placeholder="介绍该专业的培养目标与特色"
                    rows={4}
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="核心课程">
                    <StringArrayEditor
                      items={item.curriculum}
                      onChange={(v) => update(item.id, 'curriculum', v)}
                      placeholder="输入课程名后按回车添加"
                    />
                  </Field>
                  <Field label="就业方向">
                    <StringArrayEditor
                      items={item.career}
                      onChange={(v) => update(item.id, 'career', v)}
                      placeholder="输入就业方向后按回车添加"
                    />
                  </Field>
                </div>
                <Field label="特色专业">
                  <Toggle
                    checked={item.featured}
                    onChange={(v) => update(item.id, 'featured', v)}
                    label="设为特色专业（首页推荐展示）"
                  />
                </Field>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-dark-400 rounded-xl bg-white border border-dashed border-dark-200">
            暂无专业，点击右上角“添加专业”创建
          </div>
        )}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
