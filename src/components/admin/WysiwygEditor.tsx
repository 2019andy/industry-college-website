'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Quote,
  Code,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Unlink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
  label?: string;
  hint?: string;
  required?: boolean;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-8 min-w-8 items-center justify-center rounded-md border border-transparent px-1.5 text-dark-600 hover:bg-dark-100 hover:text-dark-900 transition',
        active && 'bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-5 w-px bg-dark-200" />;
}

export function WysiwygEditor({
  value,
  onChange,
  placeholder = '请输入内容...',
  minHeight = '220px',
  className,
  label,
  hint,
  required,
}: WysiwygEditorProps) {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { class: 'text-primary-600 underline underline-offset-2' },
      }),
      Image.configure({ inline: true, allowBase64: true }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const isSame = editor.getHTML() === value;
    if (!isSame && value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        className={cn(
          'w-full rounded-xl border border-dark-200 bg-dark-50 animate-pulse',
          className
        )}
        style={{ minHeight }}
      />
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('输入链接地址 (https://...)', previousUrl || '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('输入图片 URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-dark-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* 1st: Toolbar — 横向可滚动，适配移动端 */}
      <div className="flex flex-wrap items-center gap-0.5 rounded-t-xl border border-dark-200 border-b-0 bg-white p-2 shadow-[0_1px_0_rgba(0,0,0,0.02)] overflow-x-auto lg:overflow-x-visible lg:flex-nowrap">
        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="撤销">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="重做">
          <Redo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarDivider />
        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title="标题 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="标题 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="标题 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarDivider />
        {/* Inline marks */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="加粗">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="斜体">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="下划线">
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="删除线">
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="代码">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="高亮">
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        {/* Color */}
        <div className="relative mx-1">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            title="文字颜色"
            className="h-8 w-8 cursor-pointer rounded-md border border-dark-200 p-0.5 bg-white"
            defaultValue="#3041d0"
          />
        </div>
        <ToolbarDivider />
        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="左对齐">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="居中对齐">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="右对齐">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarDivider />
        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="无序列表">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="有序列表">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="引用">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarDivider />
        {/* Link / Unlink / Image */}
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="插入链接">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} title="移除链接">
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
        )}
        <ToolbarButton onClick={addImage} title="插入图片">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* 2nd: Content area */}
      <div className="rounded-b-xl border border-t-0 border-dark-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 transition">
        <EditorContent
          editor={editor}
          className="prose-admin-editor"
          style={{ minHeight }}
        />
      </div>

      {hint && (
        <p className="mt-2 text-xs text-dark-500">{hint}</p>
      )}
    </div>
  );
}

export default WysiwygEditor;
