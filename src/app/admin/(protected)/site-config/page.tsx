'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field,
  TextInput,
  TextArea,
  StringArrayEditor,
  SaveBar,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, SiteConfig } from '@/lib/types';

export default function SiteConfigPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['siteConfig']>('siteConfig');
  const [local, setLocal] = useState<SiteConfig | null>(null);
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

  const update = (patch: Partial<SiteConfig>) => {
    setLocal((prev) => (prev ? { ...prev, ...patch } : prev));
    setDirty(true);
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
        <h1 className="text-2xl font-bold text-dark-900">站点设置</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院名称、描述、关键词等基础信息</p>
      </div>

      <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
        <Field label="学院名称" required hint="用于网站标题与品牌展示">
          <TextInput
            value={local.name}
            onChange={(v) => update({ name: v })}
            placeholder="如：中跨数字贸易产业学院"
          />
        </Field>
        <Field label="学院全称" required hint="用于页脚与正式场合的完整名称">
          <TextInput
            value={local.fullName}
            onChange={(v) => update({ fullName: v })}
            placeholder="如：中跨数字贸易产业学院"
          />
        </Field>
        <Field label="学院描述" hint="一段简短的学院介绍，用于 SEO meta description">
          <TextArea
            value={local.description}
            onChange={(v) => update({ description: v })}
            placeholder="一段简短的学院介绍..."
            rows={4}
          />
        </Field>
        <Field label="关键词" hint="用于 SEO，输入关键词后按回车添加">
          <StringArrayEditor
            items={local.keywords}
            onChange={(items) => update({ keywords: items })}
            placeholder="输入关键词后按回车添加"
          />
        </Field>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
