'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { TextInput, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, NavItem } from '@/lib/types';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Link2,
  Menu,
  FileEdit,
  ExternalLink,
} from 'lucide-react';

export default function NavigationPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['navigation']>('navigation');
  const [local, setLocal] = useState<NavItem[] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const router = useRouter();

  // 一级页面路径 → 页面编辑器的后台路径映射
  const PAGE_EDITOR_MAP: Record<string, string> = {
    '/about': '/admin/page-editor/about',
    '/programs': '/admin/page-editor/programs',
    '/industry': '/admin/page-editor/industry',
    '/faculty': '/admin/page-editor/faculty',
    '/news': '/admin/page-editor/news',
    '/contact': '/admin/page-editor/contact',
  };

  const getEditorPath = (href: string): string | null => {
    if (!href) return null;
    const clean = href.split('#')[0].split('?')[0];
    return PAGE_EDITOR_MAP[clean] || null;
  };

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

  const updateItem = (index: number, patch: Partial<NavItem>) => {
    setLocal((prev) =>
      prev ? prev.map((item, i) => (i === index ? { ...item, ...patch } : item)) : prev
    );
    markDirty();
  };

  const updateChild = (parentIndex: number, childIndex: number, patch: Partial<NavItem>) => {
    setLocal((prev) =>
      prev
        ? prev.map((item, i) => {
            if (i !== parentIndex) return item;
            const children = (item.children || []).map((c, ci) =>
              ci === childIndex ? { ...c, ...patch } : c
            );
            return { ...item, children };
          })
        : prev
    );
    markDirty();
  };

  const addItem = () => {
    setLocal((prev) => [...(prev || []), { label: '新菜单项', href: '/' }]);
    markDirty();
  };

  const removeItem = (index: number) => {
    setLocal((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
    markDirty();
  };

  const addChild = (parentIndex: number) => {
    setLocal((prev) =>
      prev
        ? prev.map((item, i) =>
            i === parentIndex
              ? { ...item, children: [...(item.children || []), { label: '新子菜单', href: '/' }] }
              : item
          )
        : prev
    );
    setExpanded((e) => ({ ...e, [parentIndex]: true }));
    markDirty();
  };

  const removeChild = (parentIndex: number, childIndex: number) => {
    setLocal((prev) =>
      prev
        ? prev.map((item, i) => {
            if (i !== parentIndex) return item;
            return {
              ...item,
              children: (item.children || []).filter((_, ci) => ci !== childIndex),
            };
          })
        : prev
    );
    markDirty();
  };

  const toggleExpand = (index: number) => {
    setExpanded((e) => ({ ...e, [index]: !e[index] }));
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
        <h1 className="text-2xl font-bold text-dark-900">导航菜单</h1>
        <p className="text-sm text-dark-500 mt-1">管理网站顶部导航结构，支持二级子菜单</p>
      </div>

      <div className="space-y-4">
        {local.map((item, index) => {
          const childCount = item.children?.length ?? 0;
          const hasChildren = childCount > 0;
          const isExpanded = expanded[index] ?? false;
          return (
            <div key={index} className="rounded-2xl bg-white border border-dark-100 p-4 md:p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Menu className="h-4 w-4" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  <TextInput
                    value={item.label}
                    onChange={(v) => updateItem(index, { label: v })}
                    placeholder="菜单名称"
                  />
                  <TextInput
                    value={item.href}
                    onChange={(v) => updateItem(index, { href: v })}
                    placeholder="链接地址，如 /about"
                  />
                </div>
                {hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(index)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-dark-500 hover:bg-dark-50"
                    title={isExpanded ? '收起子菜单' : '展开子菜单'}
                  >
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                )}
                {/* 预览前端页面 */}
                <button
                  type="button"
                  onClick={() => window.open(item.href, '_blank')}
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-primary-600 hover:bg-primary-50"
                  title="预览该页面（新窗口打开）"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
                {/* 页面编辑器入口（仅可识别的一级二级页面） */}
                {getEditorPath(item.href) && (
                  <button
                    type="button"
                    onClick={() => router.push(getEditorPath(item.href)!)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-3 text-white text-xs font-semibold hover:from-primary-600 hover:to-primary-700 shadow-sm"
                    title="编辑该页面内容"
                  >
                    <FileEdit className="h-3.5 w-3.5" />
                    页面编辑
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                  title="删除菜单项"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {hasChildren && isExpanded && (
                <div className="mt-4 ml-4 md:ml-12 space-y-3 border-l-2 border-dark-100 pl-4">
                  {item.children!.map((child, ci) => (
                    <div key={ci} className="flex flex-wrap items-center gap-2 md:gap-3">
                      <Link2 className="h-4 w-4 text-dark-400 shrink-0" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        <TextInput
                          value={child.label}
                          onChange={(v) => updateChild(index, ci, { label: v })}
                          placeholder="子菜单名称"
                        />
                        <TextInput
                          value={child.href}
                          onChange={(v) => updateChild(index, ci, { href: v })}
                          placeholder="链接地址"
                        />
                      </div>
                      {getEditorPath(child.href) && (
                        <button
                          type="button"
                          onClick={() => router.push(getEditorPath(child.href)!)}
                          className="inline-flex h-9 items-center gap-1 rounded-lg bg-gold-500 px-2.5 text-white text-[11px] font-semibold hover:bg-gold-600 shrink-0"
                          title="编辑该页面内容"
                        >
                          <FileEdit className="h-3.5 w-3.5" />
                          编辑页面
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeChild(index, ci)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 shrink-0"
                        title="删除子菜单"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addChild(index)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    添加子菜单
                  </button>
                </div>
              )}

              {(!hasChildren || !isExpanded) && (
                <div className="mt-3 ml-12">
                  <button
                    type="button"
                    onClick={() => addChild(index)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    {hasChildren ? `管理子菜单（${childCount}）` : '添加子菜单'}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {local.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-dark-200 p-12 text-center">
            <p className="text-sm text-dark-400">暂无导航项，点击下方按钮添加</p>
          </div>
        )}

        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/30 py-4 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all inline-flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          添加导航项
        </button>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
