'use client';

import { cn } from '@/lib/utils';

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
    <div className="sticky bottom-0 mt-8 -mx-6 md:-mx-8 px-6 md:px-8 py-4 bg-white/80 backdrop-blur-lg border-t border-dark-100 flex items-center justify-between gap-4">
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
