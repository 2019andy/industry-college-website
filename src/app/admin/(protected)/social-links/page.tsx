'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, Select, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, SocialLink } from '@/lib/types';
import { Plus, Trash2, Share2, ExternalLink } from 'lucide-react';

const ICON_PRESETS = [
  'Wechat',
  'Weibo',
  'Qq',
  'Github',
  'Linkedin',
  'Twitter',
  'Facebook',
  'Instagram',
  'Youtube',
  'Mail',
  'Phone',
  'MessageCircle',
];

function iconOptions(current: string) {
  const list = [...ICON_PRESETS];
  if (current && !list.includes(current)) list.unshift(current);
  return list.map((v) => ({ label: v, value: v }));
}

export default function SocialLinksPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['socialLinks']>('socialLinks');
  const [local, setLocal] = useState<SocialLink[] | null>(null);
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

  const updateItem = (index: number, patch: Partial<SocialLink>) => {
    setLocal((prev) =>
      prev ? prev.map((item, i) => (i === index ? { ...item, ...patch } : item)) : prev
    );
    markDirty();
  };

  const addItem = () => {
    setLocal((prev) => [...(prev || []), { name: '新社交平台', icon: 'Wechat', href: 'https://' }]);
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
        <h1 className="text-2xl font-bold text-dark-900">社交链接</h1>
        <p className="text-sm text-dark-500 mt-1">管理页脚展示的社交媒体账号链接</p>
      </div>

      <div className="space-y-4">
        {local.map((item, index) => (
          <div key={index} className="rounded-2xl bg-white border border-dark-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Share2 className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-dark-700">
                  {item.name || `社交链接 #${index + 1}`}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="平台名称" required>
                <TextInput
                  value={item.name}
                  onChange={(v) => updateItem(index, { name: v })}
                  placeholder="如 微信公众号"
                />
              </Field>
              <Field label="图标" hint="对应 lucide-react 图标名称">
                <Select
                  value={item.icon}
                  onChange={(v) => updateItem(index, { icon: v })}
                  options={iconOptions(item.icon)}
                />
              </Field>
            </div>

            <Field label="链接地址" required hint="完整的 URL，如 https://...">
              <TextInput
                value={item.href}
                onChange={(v) => updateItem(index, { href: v })}
                placeholder="https://..."
              />
            </Field>

            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                预览链接
              </a>
            )}
          </div>
        ))}

        {local.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-dark-200 p-12 text-center">
            <p className="text-sm text-dark-400">暂无社交链接，点击下方按钮添加</p>
          </div>
        )}

        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/30 py-4 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all inline-flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          添加社交链接
        </button>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
