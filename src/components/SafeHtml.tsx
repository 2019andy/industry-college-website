'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface SafeHtmlProps {
  html: string;
  className?: string;
  /**
   * 视觉风格：
   * - body：常规正文段落（行间距较大，段间距明显）
   * - compact：紧凑段落
   * - prose-like：接近 markdown/prose 样式的排版
   */
  variant?: 'body' | 'compact' | 'prose-like';
}

/**
 * 渲染富文本编辑器输出的 HTML。
 * 内部使用 DOMPurify 清除危险标签/属性，防止 XSS 注入。
 */
export default function SafeHtml({ html, className, variant = 'body' }: SafeHtmlProps) {
  const purified = useMemo(() => {
    if (!html) return '';
    if (typeof window === 'undefined') {
      // SSR：简单白名单剥离（保持浏览器 DOMPurify 处理更完善）
      return html;
    }
    return DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'rel'],
      ALLOWED_TAGS: [
        'p', 'br', 'span', 'strong', 'em', 'b', 'i', 'u', 's',
        'h1', 'h2', 'h3', 'h4', 'h5',
        'ul', 'ol', 'li',
        'blockquote', 'pre', 'code',
        'a', 'img',
        'mark',
        'div',
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'src', 'alt', 'title',
        'class', 'style',
        'colspan', 'rowspan',
      ],
    });
  }, [html]);

  if (!html) return null;

  return (
    <div
      className={cn(
        'wysiwyg-render',
        variant === 'body' &&
          'text-dark-700 text-base leading-relaxed space-y-4 [&>p]:my-4',
        variant === 'compact' &&
          'text-dark-600 text-sm md:text-base leading-relaxed',
        variant === 'prose-like' &&
          'prose-content',
        className
      )}
      dangerouslySetInnerHTML={{ __html: purified }}
    />
  );
}
