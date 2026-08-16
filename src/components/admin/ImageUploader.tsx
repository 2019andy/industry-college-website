'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Trash2, RefreshCw, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toast } from './Toast';

export interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  required?: boolean;
  /** 预览图最大高度 */
  previewHeight?: string;
  /** 提示是否允许空（true=显示"无照片"） */
  allowEmpty?: boolean;
  /** 空按钮文字（删除图片时给 onChange 传空字符串）*/
  emptyLabel?: string;
  className?: string;
}

type TabKey = 'upload' | 'url';

/**
 * 图片上传/填写 URL 二合一组件
 * - 「上传」Tab：本地选择/拖放 → POST /api/upload → 返回持久化 /uploads/xxx.jpg
 * - 「URL」Tab：直接填写服务器地址或外链 URL
 * 两者统一 onChange(photoUrl)，空串代表无图
 */
export function ImageUploader({
  value,
  onChange,
  label,
  hint,
  required,
  previewHeight = 'h-40',
  allowEmpty = true,
  emptyLabel = '移除照片',
  className,
}: ImageUploaderProps) {
  const [tab, setTab] = useState<TabKey>(value && (value.startsWith('http') || value.startsWith('/')) ? 'url' : 'upload');
  const [isDrag, setIsDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState<string>(value || '');
  const [previewLocal, setPreviewLocal] = useState<string | null>(null); // 临时 blob URL 预览
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // 外部 value 变更（如 setLocal 重置）→ 同步 urlInput 与 tab
  useEffect(() => {
    setUrlInput(value || '');
    if (value) {
      if (value.startsWith('/uploads/') || value.startsWith('blob:')) {
        setTab('upload');
      } else {
        setTab('url');
      }
    }
  }, [value]);

  // 清理临时 blob URL
  useEffect(() => {
    return () => {
      if (previewLocal && previewLocal.startsWith('blob:')) {
        URL.revokeObjectURL(previewLocal);
      }
    };
  }, [previewLocal]);

  const uploadFile = useCallback(async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setToast({ type: 'error', msg: '请选择图片文件（jpg/png/webp/gif/svg）' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ type: 'error', msg: '图片不能大于 5MB' });
      return;
    }
    // 立即预览
    setPreviewLocal((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || `上传失败(${res.status})`);
      }
      onChange(json.url); // 持久化 URL：/uploads/xxx.jpg
      setToast({ type: 'success', msg: '上传成功' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setToast({ type: 'error', msg: '上传失败：' + msg });
      setPreviewLocal(null);
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadFile(f);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) uploadFile(f);
  };

  const hasImage = Boolean(value);
  const displaySrc = hasImage
    ? value!
    : previewLocal || '';

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-semibold text-dark-800 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Tabs */}
      <div className="inline-flex rounded-lg border border-dark-200 bg-dark-50 p-1 mb-3 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors',
            tab === 'upload' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-500 hover:text-dark-700'
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          本地上传
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors',
            tab === 'url' ? 'bg-white text-primary-700 shadow-sm' : 'text-dark-500 hover:text-dark-700'
          )}
        >
          <LinkIcon className="h-3.5 w-3.5" />
          填写 URL
        </button>
      </div>

      {/* 预览区（公共） */}
      {displaySrc && (
        <div className="relative mb-4 rounded-xl border border-dark-200 bg-dark-50 overflow-hidden">
          <img
            src={displaySrc}
            alt="照片预览"
            className={cn('w-full object-cover', previewHeight)}
          />
          {/* overlay：uploading / remove */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            {uploading && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-700/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <RefreshCw className="h-3 w-3 animate-spin" />
                上传中…
              </span>
            )}
            {allowEmpty && !uploading && (
              <button
                type="button"
                title={emptyLabel}
                onClick={() => {
                  onChange('');
                  setPreviewLocal(null);
                  setUrlInput('');
                }}
                className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur hover:bg-red-600"
              >
                <Trash2 className="h-3 w-3" />
                {emptyLabel}
              </button>
            )}
          </div>
          {/* 上传完成 URL 水印 */}
          {value && !uploading && (
            <div className="absolute bottom-0 inset-x-0 bg-dark-950/70 px-3 py-1.5 text-[11px] font-mono text-white truncate backdrop-blur">
              {value}
            </div>
          )}
        </div>
      )}

      {tab === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            'cursor-pointer rounded-xl border-2 border-dashed px-5 py-7 text-center transition-all select-none',
            isDrag
              ? 'border-primary-500 bg-primary-50/60'
              : 'border-dark-200 bg-dark-50/60 hover:border-primary-400 hover:bg-primary-50/30'
          )}
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            {hasImage || previewLocal ? (
              <RefreshCw className={cn('h-5 w-5', uploading && 'animate-spin')} />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </div>
          <p className="text-sm font-semibold text-dark-800 mb-0.5">
            {uploading ? '上传中，请稍候…' : hasImage ? '点击重新选择，或拖放图片至此' : '点击选择图片，或拖放图片至此'}
          </p>
          <p className="text-xs text-dark-500">支持 jpg / png / webp / gif / svg，单张最大 5MB</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={onFilePicked}
            className="hidden"
            disabled={uploading}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dark-200 bg-dark-50/40 p-4">
          <label className="block text-xs font-semibold text-dark-700 mb-1.5">
            服务器图片地址（URL / 路径）
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="例如：/img/leader.jpg 或 https://example.com/photo.jpg"
                onBlur={() => onChange(urlInput.trim())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onChange(urlInput.trim());
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full rounded-lg border border-dark-200 bg-white pl-9 pr-9 py-2.5 text-sm outline-none placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => { setUrlInput(''); onChange(''); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-dark-400 hover:text-red-500"
                  title="清空"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(urlInput.trim())}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-primary-700"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              应用
            </button>
          </div>
          <p className="mt-2 text-xs text-dark-500 leading-relaxed">
            支持两种形式：<br/>
            ① <b>本站相对路径</b>：例如 <code className="rounded bg-dark-100 px-1.5 py-0.5 text-dark-700">/img/leader.jpg</code>（public 目录下的文件）<br/>
            ② <b>外链 URL</b>：例如 <code className="rounded bg-dark-100 px-1.5 py-0.5 text-dark-700">https://cdn.example.com/photo.jpg</code>
          </p>
        </div>
      )}

      {hint && <p className="text-xs text-dark-500 mt-2">{hint}</p>}

      <Toast
        message={toast ? toast.msg : null}
        onClose={() => setToast(null)}
        type={toast?.type || 'success'}
      />
    </div>
  );
}
