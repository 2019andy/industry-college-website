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
import type { SiteContent, TrainingBase } from '@/lib/types';
import { Plus, Trash2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

export default function TrainingBasesAdminPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['trainingBases']>('trainingBases');
  const [items, setItems] = useState<TrainingBase[]>([]);
  const [dirty, setDirty] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  }, [data]);

  const update = (id: number, field: keyof TrainingBase, value: any) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
    setDirty(true);
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    const newItem: TrainingBase = {
      id: newId,
      name: '新实训基地',
      area: '',
      seats: '',
      systems: [],
      description: '',
    };
    setItems([...items, newItem]);
    setExpandedId(newId);
    setDirty(true);
  };

  const removeItem = (id: number) => {
    if (!window.confirm('确认删除该实训基地？')) return;
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
        <h1 className="text-2xl font-bold text-dark-900">实训基地</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院的实训基地、场地规模与实训系统</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-500">共 {items.length} 个基地</p>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> 添加基地
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
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-dark-900 truncate">
                    {item.name || '未命名基地'}
                  </div>
                  <div className="text-xs text-dark-500 truncate">
                    {[item.area, item.seats && `容纳 ${item.seats} 人`]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
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
                <Field label="基地名称" required>
                  <TextInput
                    value={item.name}
                    onChange={(v) => update(item.id, 'name', v)}
                    placeholder="如 跨境电商实训中心"
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="场地面积">
                    <TextInput
                      value={item.area}
                      onChange={(v) => update(item.id, 'area', v)}
                      placeholder="如 500㎡"
                    />
                  </Field>
                  <Field label="容纳人数">
                    <TextInput
                      value={item.seats}
                      onChange={(v) => update(item.id, 'seats', v)}
                      placeholder="如 60"
                    />
                  </Field>
                </div>
                <Field label="实训系统">
                  <StringArrayEditor
                    items={item.systems}
                    onChange={(v) => update(item.id, 'systems', v)}
                    placeholder="输入系统名称后按回车添加"
                  />
                </Field>
                <Field label="基地描述">
                  <TextArea
                    value={item.description}
                    onChange={(v) => update(item.id, 'description', v)}
                    placeholder="基地功能与特色描述"
                    rows={4}
                  />
                </Field>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-dark-400 rounded-xl bg-white border border-dashed border-dark-200">
            暂无实训基地，点击右上角“添加基地”创建
          </div>
        )}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
