'use client';

import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { IconName } from '@/lib/types';

// 标签 + 输入框
export function Field({
  label,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-5', className)}>
      <label className="block text-sm font-semibold text-dark-800 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-dark-500 mt-1.5">{hint}</p>}
    </div>
  );
}

export const inputClass =
  'w-full rounded-lg border border-dark-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10';

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={cn(inputClass, 'resize-none')}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// 字符串数组编辑器（标签式）
export function StringArrayEditor({
  items,
  onChange,
  placeholder = '输入后按回车添加',
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      onChange([...items, e.currentTarget.value.trim()]);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="rounded-lg border border-dark-200 bg-white p-2 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10">
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
          >
            {item}
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-primary-400 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        onKeyDown={handleKeyDown}
        placeholder={items.length === 0 ? placeholder : ''}
        className="w-full border-0 p-1 text-sm outline-none placeholder:text-dark-400"
      />
    </div>
  );
}

// 布尔开关
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-primary-600' : 'bg-dark-200'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && <span className="text-sm text-dark-700">{label}</span>}
    </label>
  );
}

// 保存操作栏
export function SaveBar({
  onSave,
  onReset,
  saving,
  dirty,
}: {
  onSave: () => void;
  onReset?: () => void;
  saving: boolean;
  dirty: boolean;
}) {
  return (
    <div className="sticky bottom-0 mt-8 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/80 backdrop-blur-lg border-t border-dark-100 flex items-center justify-between gap-3">
      <span className="text-xs text-dark-500">
        {dirty ? '有未保存的更改' : '所有更改已保存'}
      </span>
      <div className="flex gap-3">
        {onReset && (
          <button
            onClick={onReset}
            disabled={!dirty || saving}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-dark-600 hover:bg-dark-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            放弃更改
          </button>
        )}
        <button
          onClick={onSave}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
        >
          {saving ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              保存中...
            </>
          ) : (
            '保存更改'
          )}
        </button>
      </div>
    </div>
  );
}

// ===== 可视化卡片编辑器公共组件 =====

const ALL_ICONS: IconName[] = [
  'Award','Building2','Briefcase','Users','Target','Eye','Heart','Lightbulb','GraduationCap',
  'Rocket','Sparkles','Trophy','ShieldCheck','ArrowRight','TrendingUp','BookOpen','CheckCircle',
  'Cpu','Globe','Store','Layers','Clock','UserCheck','Handshake','BriefcaseBusiness','Network',
  'LineChart','School','MapPin','Bus','Car','Train','Phone','Mail','MessageCircle','QrCode',
  'Headphones','PlayCircle','Zap','Star','Gift',
];

const COLOR_OPTIONS = [
  { value: 'primary', label: '靛青（主色）', preview: 'bg-primary-500' },
  { value: 'gold', label: '金色', preview: 'bg-gold-500' },
  { value: 'violet', label: '紫罗兰', preview: 'bg-violet-500' },
  { value: 'emerald', label: '翠绿', preview: 'bg-emerald-500' },
  { value: 'rose', label: '玫红', preview: 'bg-rose-500' },
  { value: 'sky', label: '天蓝', preview: 'bg-sky-500' },
  { value: 'amber', label: '琥珀', preview: 'bg-amber-500' },
];

/** 图标选择器：下拉 + 实时预览 */
export function IconSelect({
  value,
  onChange,
  placeholder = '选择图标',
}: {
  value: string;
  onChange: (v: IconName) => void;
  placeholder?: string;
}) {
  const CurrentIcon = (LucideIcons as Record<string, unknown>)[value as string] as
    | React.ComponentType<{ className?: string }>
    | undefined;
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IconName)}
        className={cn(inputClass, 'pl-10 appearance-none')}
      >
        <option value="" disabled>{placeholder}</option>
        {ALL_ICONS.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-600">
        {CurrentIcon ? <CurrentIcon className="h-4 w-4" /> : null}
      </span>
    </div>
  );
}

/** 颜色选择器：下拉 + 色块预览 */
export function ColorSelect({
  value,
  onChange,
  allowEmpty = false,
}: {
  value: string;
  onChange: (v: string) => void;
  allowEmpty?: boolean;
}) {
  const current = COLOR_OPTIONS.find((o) => o.value === value);
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, 'pl-10 appearance-none')}
      >
        {allowEmpty && <option value="">（无）</option>}
        {COLOR_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        {current ? (
          <span className={cn('inline-block h-4 w-4 rounded-full border border-white shadow-sm', current.preview)} />
        ) : (
          <span className="inline-block h-4 w-4 rounded-full border border-dashed border-dark-300 bg-dark-50" />
        )}
      </span>
    </div>
  );
}

/**
 * 可折叠卡片项（用于数组元素的可视化编辑）
 * - 头部：序号 / 标题 / 标签 / 主色调 / 删除按钮 / 展开收起
 * - 内容区：展开后显示各字段编辑器
 */
export function CardItem({
  index,
  title,
  subtitle,
  accent,
  defaultOpen = false,
  removable = true,
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
  badge,
}: {
  index: number;
  title: string;
  subtitle?: string;
  accent?: string;
  defaultOpen?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const accentObj = COLOR_OPTIONS.find((o) => o.value === accent);
  return (
    <div
      className={cn(
        'rounded-xl border transition-shadow',
        open
          ? 'border-primary-200 bg-white shadow-card'
          : 'border-dark-100 bg-dark-50/40 hover:bg-white hover:shadow-sm'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm',
            accentObj?.preview || 'bg-primary-500'
          )}
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="truncate text-sm font-semibold text-dark-900">
              {title || `（未命名项 ${index + 1}）`}
            </p>
            {badge && (
              <span className="rounded-md bg-dark-100 px-1.5 py-0.5 text-[10px] font-medium text-dark-600">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="truncate text-xs text-dark-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}>
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              title="上移"
              className="flex h-8 w-8 items-center justify-center rounded-md text-dark-500 hover:bg-dark-100"
            >
              <LucideIcons.ChevronUp className="h-4 w-4" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              title="下移"
              className="flex h-8 w-8 items-center justify-center rounded-md text-dark-500 hover:bg-dark-100"
            >
              <LucideIcons.ChevronDown className="h-4 w-4" />
            </button>
          )}
          {removable && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              title="删除该项"
              className="flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"
            >
              <LucideIcons.Trash2 className="h-4 w-4" />
            </button>
          )}
          <span
            className={cn(
              'ml-1 flex h-8 w-8 items-center justify-center rounded-md text-dark-400 transition-transform',
              open && 'rotate-180'
            )}
          >
            <LucideIcons.ChevronDown className="h-4 w-4" />
          </span>
        </span>
      </button>
      {open && (
        <div className="border-t border-dark-100 px-4 py-4 md:px-5 md:py-5 space-y-0">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * 列表头部标题 + 新增按钮包装器
 */
export function CardListHeader({
  icon,
  title,
  subtitle,
  addLabel,
  onAdd,
  count,
  iconBg = 'bg-primary-50 text-primary-600',
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  addLabel: string;
  onAdd: () => void;
  count?: number;
  iconBg?: string;
}) {
  const PlusIcon = LucideIcons.Plus;
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl shrink-0', iconBg)}>
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-dark-900">{title}</h3>
            {typeof count === 'number' && (
              <span className="rounded-md bg-dark-100 px-2 py-0.5 text-[11px] font-semibold text-dark-600">
                共 {count} 项
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-dark-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 text-white text-xs font-semibold hover:bg-primary-700 shadow-sm shadow-primary-500/20 shrink-0"
      >
        <PlusIcon className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );
}

/** 通用数组工具：添加/删除/修改字段/交换顺序，用于页面内调用 */
export function nextId<T extends { id: number }>(arr: T[]): number {
  return arr.length === 0 ? 1 : Math.max(...arr.map((a) => a.id)) + 1;
}

