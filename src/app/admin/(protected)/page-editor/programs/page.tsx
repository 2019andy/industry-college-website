'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field,
  TextInput,
  SaveBar,
  IconSelect,
  ColorSelect,
  CardItem,
  CardListHeader,
  nextId,
  StringArrayEditor,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import type { ProgramsPageConfig, PageBanner, IconName } from '@/lib/types';
import {
  GraduationCap,
  Flag,
  BookOpen,
  Route,
  Rocket,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '专业设置',
  subtitle: '产教融合 · 面向未来的数字贸易专业群',
  breadcrumb: '首页 / 专业设置',
};

const defaultProgramsPage: ProgramsPageConfig = {
  banner: defaultBanner,
  overviewTitle: '专业总览',
  overviewHighlight: '专业总览',
  overviewParagraph: '',
  cultivationPathTitle: '人才培养路径',
  cultivationPathHighlight: '人才培养路径',
  cultivationPathParagraph: '',
  cultivationSteps: [],
  ctaTitle: '开启你的数字贸易未来',
  ctaHighlight: '数字贸易未来',
  ctaParagraph: '',
};

type CultivationStep = ProgramsPageConfig['cultivationSteps'][number];

export default function ProgramsPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<ProgramsPageConfig>('programsPage');
  const [local, setLocal] = useState<ProgramsPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultProgramsPage);
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

  const patchBanner = <K extends keyof PageBanner>(key: K, value: PageBanner[K]) => {
    setLocal((prev) => (prev ? { ...prev, banner: { ...prev.banner, [key]: value } } : prev));
    markDirty();
  };

  const patch = <K extends keyof ProgramsPageConfig>(key: K, value: ProgramsPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const patchCultivationStep = (index: number, updates: Partial<CultivationStep>) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.cultivationSteps];
      newArr[index] = { ...newArr[index], ...updates };
      return { ...prev, cultivationSteps: newArr };
    });
    markDirty();
  };

  const removeCultivationStep = (index: number) => {
    setLocal((prev) => prev ? { ...prev, cultivationSteps: prev.cultivationSteps.filter((_, i) => i !== index) } : prev);
    markDirty();
  };

  const moveCultivationStepUp = (index: number) => {
    setLocal((prev) => {
      if (!prev || index === 0) return prev;
      const newArr = [...prev.cultivationSteps];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return { ...prev, cultivationSteps: newArr };
    });
    markDirty();
  };

  const moveCultivationStepDown = (index: number) => {
    setLocal((prev) => {
      if (!prev || index >= prev.cultivationSteps.length - 1) return prev;
      const newArr = [...prev.cultivationSteps];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      return { ...prev, cultivationSteps: newArr };
    });
    markDirty();
  };

  const addCultivationStep = () => {
    setLocal((prev) => prev ? {
      ...prev,
      cultivationSteps: [...prev.cultivationSteps, {
        id: nextId(prev.cultivationSteps),
        year: '学年',
        yearLabel: '第N学年',
        title: '阶段标题',
        description: '<p></p>',
        highlights: [],
        color: 'primary',
        icon: 'BookOpen',
      }],
    } : prev);
    markDirty();
  };

  const handleSave = async () => {
    const ok = await save(local);
    if (ok) setDirty(false);
  };

  const handleReset = () => {
    if (data) {
      setLocal(data);
    } else {
      setLocal(defaultProgramsPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">专业设置页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「专业设置」二级页面的 Banner、专业总览、人才培养路径、CTA 引导区等内容
        </p>
      </div>

      <div className="space-y-6">
        {/* Banner */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">页面顶部 Banner</h3>
              <p className="text-xs text-dark-500">页面进入时最上方的大图区域文字</p>
            </div>
          </div>
          <Field label="Banner 标题" required>
            <TextInput value={local.banner.title} onChange={(v) => patchBanner('title', v)} placeholder="例如：专业设置" />
          </Field>
          <Field label="Banner 副标题">
            <TextInput value={local.banner.subtitle} onChange={(v) => patchBanner('subtitle', v)} />
          </Field>
          <Field label="面包屑文字">
            <TextInput value={local.banner.breadcrumb} onChange={(v) => patchBanner('breadcrumb', v)} />
          </Field>
        </div>

        {/* 专业总览 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">专业总览</h3>
              <p className="text-xs text-dark-500">专业列表上方的总览说明</p>
            </div>
          </div>
          <Field label="总览标题" required>
            <TextInput value={local.overviewTitle} onChange={(v) => patch('overviewTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.overviewHighlight} onChange={(v) => patch('overviewHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="总览描述段落"
            value={local.overviewParagraph}
            onChange={(v) => patch('overviewParagraph', v)}
            minHeight="180px"
          />
        </div>

        {/* 人才培养路径 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Route className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">人才培养路径</h3>
              <p className="text-xs text-dark-500">四年制培养阶段说明</p>
            </div>
          </div>
          <Field label="培养路径标题">
            <TextInput value={local.cultivationPathTitle} onChange={(v) => patch('cultivationPathTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.cultivationPathHighlight} onChange={(v) => patch('cultivationPathHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="培养路径描述段落"
            value={local.cultivationPathParagraph}
            onChange={(v) => patch('cultivationPathParagraph', v)}
            minHeight="120px"
          />
          <CardListHeader
            icon={<Route className="h-5 w-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
            title="培养步骤卡片"
            subtitle="四年制每学年的内容"
            addLabel="添加培养步骤"
            count={local.cultivationSteps.length}
            onAdd={addCultivationStep}
          />
          <div className="space-y-3 mt-2">
            {local.cultivationSteps.map((item, index) => (
              <CardItem
                key={item.id}
                index={index}
                title={item.title}
                subtitle={`${item.year}｜${item.yearLabel}`}
                accent={item.color}
                badge="培养步骤"
                onRemove={() => removeCultivationStep(index)}
                onMoveUp={index > 0 ? () => moveCultivationStepUp(index) : undefined}
                onMoveDown={index < local.cultivationSteps.length - 1 ? () => moveCultivationStepDown(index) : undefined}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Field label="年级（如大一）">
                    <TextInput value={item.year} onChange={(v) => patchCultivationStep(index, { year: v })} placeholder="例如：大一" />
                  </Field>
                  <Field label="学年标签（如第1学年）">
                    <TextInput value={item.yearLabel} onChange={(v) => patchCultivationStep(index, { yearLabel: v })} placeholder="例如：第1学年" />
                  </Field>
                  <Field label="颜色">
                    <ColorSelect value={item.color} onChange={(v) => patchCultivationStep(index, { color: v })} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="图标">
                    <IconSelect value={item.icon} onChange={(v) => patchCultivationStep(index, { icon: v as IconName })} />
                  </Field>
                  <Field label="阶段标题">
                    <TextInput value={item.title} onChange={(v) => patchCultivationStep(index, { title: v })} placeholder="例如：基础筑基" />
                  </Field>
                </div>
                <WysiwygEditor
                  label="步骤描述"
                  value={item.description}
                  onChange={(v) => patchCultivationStep(index, { description: v })}
                  minHeight="120px"
                />
                <Field label="核心要点（highlights）" hint="输入后按回车添加，每学年的课程或能力标签">
                  <StringArrayEditor
                    items={item.highlights}
                    onChange={(items) => patchCultivationStep(index, { highlights: items })}
                    placeholder="输入要点后按回车添加"
                  />
                </Field>
              </CardItem>
            ))}
            {local.cultivationSteps.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/40 p-8 text-center">
                <p className="text-sm text-dark-500">暂无培养步骤，点击上方「添加培养步骤」开始创建</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA 区 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">底部 CTA 引导区</h3>
              <p className="text-xs text-dark-500">页面最下方的招生/咨询号召区</p>
            </div>
          </div>
          <Field label="CTA 标题">
            <TextInput value={local.ctaTitle} onChange={(v) => patch('ctaTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.ctaHighlight} onChange={(v) => patch('ctaHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="CTA 描述段落"
            value={local.ctaParagraph}
            onChange={(v) => patch('ctaParagraph', v)}
            minHeight="120px"
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
