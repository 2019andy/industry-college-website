'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, Select, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, Partner } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORY_OPTIONS = [
  { label: '跨境平台', value: '跨境平台' },
  { label: '社交电商', value: '社交电商' },
  { label: '数字营销', value: '数字营销' },
  { label: '独立站', value: '独立站' },
  { label: '物流仓储', value: '物流仓储' },
  { label: '跨境支付', value: '跨境支付' },
  { label: '产业运营', value: '产业运营' },
];

const CATEGORY_COLORS: Record<string, string> = {
  跨境平台: 'bg-blue-50 text-blue-700',
  社交电商: 'bg-pink-50 text-pink-700',
  数字营销: 'bg-purple-50 text-purple-700',
  独立站: 'bg-teal-50 text-teal-700',
  物流仓储: 'bg-amber-50 text-amber-700',
  跨境支付: 'bg-green-50 text-green-700',
  产业运营: 'bg-indigo-50 text-indigo-700',
};

export default function PartnersAdminPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['partners']>('partners');
  const [items, setItems] = useState<Partner[]>([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  }, [data]);

  const update = (id: number, field: keyof Partner, value: any) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
    setDirty(true);
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    const newItem: Partner = {
      id: newId,
      name: '新企业',
      category: '跨境平台',
    };
    setItems([...items, newItem]);
    setDirty(true);
  };

  const removeItem = (id: number) => {
    if (!window.confirm('确认删除该企业？')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
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

  const grouped = CATEGORY_OPTIONS.map((opt) => ({
    category: opt.value,
    list: items.filter((it) => it.category === opt.value),
  })).filter((g) => g.list.length > 0);
  const uncategorized = items.filter(
    (it) => !CATEGORY_OPTIONS.some((o) => o.value === it.category)
  );

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">合作企业</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院合作企业伙伴，按行业类别分组展示</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-500">共 {items.length} 家企业</p>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> 添加企业
        </button>
      </div>

      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-bold text-dark-700 mb-3 flex items-center gap-2">
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 text-xs',
                  CATEGORY_COLORS[group.category] || 'bg-dark-50 text-dark-700'
                )}
              >
                {group.category}
              </span>
              <span className="text-dark-400 font-normal">{group.list.length} 家</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.list.map((item) => (
                <PartnerCard
                  key={item.id}
                  item={item}
                  onUpdate={update}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>
        ))}
        {uncategorized.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-dark-700 mb-3">其他</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {uncategorized.map((item) => (
                <PartnerCard
                  key={item.id}
                  item={item}
                  onUpdate={update}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>
        )}
        {items.length === 0 && (
          <div className="text-center py-16 text-dark-400 rounded-xl bg-white border border-dashed border-dark-200">
            暂无合作企业，点击右上角“添加企业”创建
          </div>
        )}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}

function PartnerCard({
  item,
  onUpdate,
  onRemove,
}: {
  item: Partner;
  onUpdate: (id: number, field: keyof Partner, value: any) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="rounded-xl bg-white border border-dark-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
            CATEGORY_COLORS[item.category] || 'bg-dark-50 text-dark-700'
          )}
        >
          {item.category}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-400 hover:text-red-600 p-1 transition-colors"
          title="删除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <Field label="企业名称" required className="mb-0">
        <TextInput
          value={item.name}
          onChange={(v) => onUpdate(item.id, 'name', v)}
          placeholder="企业名称"
        />
      </Field>
      <Field label="行业类别" className="mb-0 mt-3">
        <Select
          value={item.category}
          onChange={(v) => onUpdate(item.id, 'category', v)}
          options={CATEGORY_OPTIONS}
        />
      </Field>
    </div>
  );
}
