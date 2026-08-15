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
import type { SiteContent, FacultyMember } from '@/lib/types';
import { Plus, Trash2, ChevronDown, ChevronUp, User } from 'lucide-react';

export default function FacultyAdminPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['facultyMembers']>('facultyMembers');
  const [items, setItems] = useState<FacultyMember[]>([]);
  const [dirty, setDirty] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setItems(data);
      setDirty(false);
    }
  }, [data]);

  const update = (id: number, field: keyof FacultyMember, value: any) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
    setDirty(true);
  };

  const addItem = () => {
    const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
    const newItem: FacultyMember = {
      id: newId,
      name: '新教师',
      title: '',
      bio: '',
      education: '',
      research: [],
      avatar: '',
    };
    setItems([...items, newItem]);
    setExpandedId(newId);
    setDirty(true);
  };

  const removeItem = (id: number) => {
    if (!window.confirm('确认删除该教师信息？')) return;
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
        <h1 className="text-2xl font-bold text-dark-900">师资团队</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院师资成员的个人信息、教育背景与研究方向</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-dark-500">共 {items.length} 位教师</p>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> 添加教师
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
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-dark-900 truncate">
                    {item.name || '未命名'}
                  </div>
                  {item.title && (
                    <div className="text-xs text-dark-500 truncate">{item.title}</div>
                  )}
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
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="姓名" required>
                    <TextInput
                      value={item.name}
                      onChange={(v) => update(item.id, 'name', v)}
                      placeholder="教师姓名"
                    />
                  </Field>
                  <Field label="职称">
                    <TextInput
                      value={item.title}
                      onChange={(v) => update(item.id, 'title', v)}
                      placeholder="如 教授 / 副教授"
                    />
                  </Field>
                  <Field label="学历背景">
                    <TextInput
                      value={item.education}
                      onChange={(v) => update(item.id, 'education', v)}
                      placeholder="如 博士毕业于XX大学"
                    />
                  </Field>
                  <Field label="头像URL" hint="可留空">
                    <TextInput
                      value={item.avatar}
                      onChange={(v) => update(item.id, 'avatar', v)}
                      placeholder="https://..."
                    />
                  </Field>
                </div>
                <Field label="个人简介">
                  <TextArea
                    value={item.bio}
                    onChange={(v) => update(item.id, 'bio', v)}
                    placeholder="教师个人简介"
                    rows={4}
                  />
                </Field>
                <Field label="研究方向">
                  <StringArrayEditor
                    items={item.research}
                    onChange={(v) => update(item.id, 'research', v)}
                    placeholder="输入研究方向后按回车添加"
                  />
                </Field>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-dark-400 rounded-xl bg-white border border-dashed border-dark-200">
            暂无教师，点击右上角“添加教师”创建
          </div>
        )}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
