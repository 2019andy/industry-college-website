'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field,
  TextInput,
  SaveBar,
  StringArrayEditor,
  IconSelect,
  ColorSelect,
  CardItem,
  CardListHeader,
  nextId,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import type { IndustryPageConfig, PageBanner, FeatureStep, SimpleStat, StepGuide } from '@/lib/types';
import {
  Handshake,
  Flag,
  LineChart,
  Layers,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '产教融合',
  subtitle: '校企协同 · 项目驱动的实战育人模式',
  breadcrumb: '首页 / 产教融合',
};

const defaultIndustryPage: IndustryPageConfig = {
  banner: defaultBanner,
  projectTitle: '产教融合项目模式',
  projectHighlight: '产教融合',
  projectParagraph: '',
  projectModes: [],
  careerTitle: '职业发展前景',
  careerHighlight: '职业发展',
  careerParagraph: '',
  careerStats: [],
  careerSteps: [],
};

export default function IndustryPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<IndustryPageConfig>('industryPage');
  const [local, setLocal] = useState<IndustryPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultIndustryPage);
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

  const patch = <K extends keyof IndustryPageConfig>(key: K, value: IndustryPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const updateProjectMode = (index: number, key: keyof FeatureStep, value: any) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.projectModes];
      newArr[index] = { ...newArr[index], [key]: value };
      return { ...prev, projectModes: newArr };
    });
    markDirty();
  };

  const addProjectMode = () => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newItem: FeatureStep = {
        id: nextId(prev.projectModes),
        icon: 'Handshake',
        title: '模式标题',
        subtitle: 'Subtitle',
        description: '<p></p>',
        tags: [],
        color: 'primary',
      };
      return { ...prev, projectModes: [...prev.projectModes, newItem] };
    });
    markDirty();
  };

  const removeProjectMode = (index: number) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = prev.projectModes.filter((_, i) => i !== index);
      return { ...prev, projectModes: newArr };
    });
    markDirty();
  };

  const moveProjectMode = (index: number, direction: 'up' | 'down') => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.projectModes];
      const target = direction === 'up' ? index - 1 : index + 1;
      [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
      return { ...prev, projectModes: newArr };
    });
    markDirty();
  };

  const updateCareerStat = (index: number, key: keyof SimpleStat, value: any) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.careerStats];
      newArr[index] = { ...newArr[index], [key]: value };
      return { ...prev, careerStats: newArr };
    });
    markDirty();
  };

  const addCareerStat = () => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newItem: SimpleStat = {
        id: nextId(prev.careerStats),
        icon: 'TrendingUp',
        label: '指标名称',
        stat: '98%',
        description: '说明',
        color: 'primary',
      };
      return { ...prev, careerStats: [...prev.careerStats, newItem] };
    });
    markDirty();
  };

  const removeCareerStat = (index: number) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = prev.careerStats.filter((_, i) => i !== index);
      return { ...prev, careerStats: newArr };
    });
    markDirty();
  };

  const moveCareerStat = (index: number, direction: 'up' | 'down') => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.careerStats];
      const target = direction === 'up' ? index - 1 : index + 1;
      [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
      return { ...prev, careerStats: newArr };
    });
    markDirty();
  };

  const updateCareerStep = (index: number, key: keyof StepGuide, value: any) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.careerSteps];
      newArr[index] = { ...newArr[index], [key]: value };
      return { ...prev, careerSteps: newArr };
    });
    markDirty();
  };

  const addCareerStep = () => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newItem: StepGuide = {
        id: nextId(prev.careerSteps),
        icon: 'BookOpen',
        stepLabel: 'Step 01',
        title: '步骤标题',
        description: '<p></p>',
      };
      return { ...prev, careerSteps: [...prev.careerSteps, newItem] };
    });
    markDirty();
  };

  const removeCareerStep = (index: number) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = prev.careerSteps.filter((_, i) => i !== index);
      return { ...prev, careerSteps: newArr };
    });
    markDirty();
  };

  const moveCareerStep = (index: number, direction: 'up' | 'down') => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.careerSteps];
      const target = direction === 'up' ? index - 1 : index + 1;
      [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
      return { ...prev, careerSteps: newArr };
    });
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
      setLocal(defaultIndustryPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">产教融合页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「产教融合」二级页面的 Banner、产教模式、职业前景、数据统计与就业步骤等内容
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
            <TextInput value={local.banner.title} onChange={(v) => patchBanner('title', v)} />
          </Field>
          <Field label="Banner 副标题">
            <TextInput value={local.banner.subtitle} onChange={(v) => patchBanner('subtitle', v)} />
          </Field>
          <Field label="面包屑文字">
            <TextInput value={local.banner.breadcrumb} onChange={(v) => patchBanner('breadcrumb', v)} />
          </Field>
        </div>

        {/* 产教融合项目模式 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">产教融合项目模式</h3>
              <p className="text-xs text-dark-500">介绍校企合作的多种模式（如项目制、订单班、双元制等）</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.projectTitle} onChange={(v) => patch('projectTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.projectHighlight} onChange={(v) => patch('projectHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.projectParagraph}
            onChange={(v) => patch('projectParagraph', v)}
            minHeight="150px"
          />

          <div className="mt-6">
            <CardListHeader
              icon={<Handshake className="h-5 w-5" />}
              title="校企合作项目模式"
              subtitle="产教融合下的多种真实项目驱动形式"
              addLabel="添加合作模式"
              onAdd={addProjectMode}
              count={local.projectModes.length}
              iconBg="bg-primary-50 text-primary-600"
            />
            <div className="space-y-3">
              {local.projectModes.map((item, index) => (
                <CardItem
                  key={item.id}
                  index={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  accent={item.color}
                  onRemove={() => removeProjectMode(index)}
                  onMoveUp={index > 0 ? () => moveProjectMode(index, 'up') : undefined}
                  onMoveDown={index < local.projectModes.length - 1 ? () => moveProjectMode(index, 'down') : undefined}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="标题">
                      <TextInput value={item.title} onChange={(v) => updateProjectMode(index, 'title', v)} />
                    </Field>
                    <Field label="副标题（英文名）">
                      <TextInput value={item.subtitle} onChange={(v) => updateProjectMode(index, 'subtitle', v)} />
                    </Field>
                    <Field label="图标">
                      <IconSelect value={item.icon} onChange={(v) => updateProjectMode(index, 'icon', v)} />
                    </Field>
                    <Field label="主色调">
                      <ColorSelect value={item.color} onChange={(v) => updateProjectMode(index, 'color', v)} />
                    </Field>
                  </div>
                  <WysiwygEditor
                    label="模式描述"
                    value={item.description}
                    onChange={(v) => updateProjectMode(index, 'description', v)}
                    minHeight="120px"
                  />
                  <Field label="标签 tags" hint={'每行一个短标签，如"真实业务"、"企业导师"'}>
                    <StringArrayEditor
                      items={item.tags}
                      onChange={(v) => updateProjectMode(index, 'tags', v)}
                      placeholder="输入标签后按回车"
                    />
                  </Field>
                </CardItem>
              ))}
              {local.projectModes.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/50 p-8 text-center">
                  <p className="text-sm text-dark-500">暂无合作模式，点击上方「添加合作模式」按钮新增</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 职业发展前景 - 统计数据 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <LineChart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">职业发展前景</h3>
              <p className="text-xs text-dark-500">就业率、薪资、岗位数据 + 入行步骤</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.careerTitle} onChange={(v) => patch('careerTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.careerHighlight} onChange={(v) => patch('careerHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.careerParagraph}
            onChange={(v) => patch('careerParagraph', v)}
            minHeight="120px"
          />

          <div className="mt-6">
            <CardListHeader
              icon={<LineChart className="h-5 w-5" />}
              title="职业发展数据统计卡片"
              subtitle="就业率、薪资、岗位等关键指标"
              addLabel="添加统计卡片"
              onAdd={addCareerStat}
              count={local.careerStats.length}
              iconBg="bg-emerald-50 text-emerald-600"
            />
            <div className="space-y-3">
              {local.careerStats.map((item, index) => (
                <CardItem
                  key={item.id}
                  index={index}
                  title={item.label}
                  subtitle={`${item.stat} · ${item.description}`}
                  accent={item.color}
                  badge="数据卡"
                  onRemove={() => removeCareerStat(index)}
                  onMoveUp={index > 0 ? () => moveCareerStat(index, 'up') : undefined}
                  onMoveDown={index < local.careerStats.length - 1 ? () => moveCareerStat(index, 'down') : undefined}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Field label="指标名称（如就业率）">
                      <TextInput value={item.label} onChange={(v) => updateCareerStat(index, 'label', v)} />
                    </Field>
                    <Field label="统计数值（如 98%）">
                      <TextInput value={item.stat} onChange={(v) => updateCareerStat(index, 'stat', v)} />
                    </Field>
                    <Field label="主色调">
                      <ColorSelect value={item.color} onChange={(v) => updateCareerStat(index, 'color', v)} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="图标">
                      <IconSelect value={item.icon} onChange={(v) => updateCareerStat(index, 'icon', v)} />
                    </Field>
                    <Field label="简短副文案（如近三年平均）">
                      <TextInput value={item.description} onChange={(v) => updateCareerStat(index, 'description', v)} />
                    </Field>
                  </div>
                </CardItem>
              ))}
              {local.careerStats.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/50 p-8 text-center">
                  <p className="text-sm text-dark-500">暂无统计卡片，点击上方「添加统计卡片」按钮新增</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 职业发展步骤 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">职业发展步骤</h3>
              <p className="text-xs text-dark-500">从入校到成为行业精英的成长路径步骤</p>
            </div>
          </div>

          <div>
            <CardListHeader
              icon={<Layers className="h-5 w-5" />}
              title="入行成长路径步骤"
              subtitle="从入校到成为行业精英的 4-5 步指引"
              addLabel="添加步骤"
              onAdd={addCareerStep}
              count={local.careerSteps.length}
              iconBg="bg-gold-50 text-gold-600"
            />
            <div className="space-y-3">
              {local.careerSteps.map((item, index) => (
                <CardItem
                  key={item.id}
                  index={index}
                  title={item.title}
                  subtitle={item.stepLabel}
                  badge="路径步骤"
                  onRemove={() => removeCareerStep(index)}
                  onMoveUp={index > 0 ? () => moveCareerStep(index, 'up') : undefined}
                  onMoveDown={index < local.careerSteps.length - 1 ? () => moveCareerStep(index, 'down') : undefined}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="步骤标签（如 Step 01）">
                      <TextInput value={item.stepLabel} onChange={(v) => updateCareerStep(index, 'stepLabel', v)} />
                    </Field>
                    <Field label="图标">
                      <IconSelect value={item.icon} onChange={(v) => updateCareerStep(index, 'icon', v)} />
                    </Field>
                  </div>
                  <Field label="步骤标题">
                    <TextInput value={item.title} onChange={(v) => updateCareerStep(index, 'title', v)} />
                  </Field>
                  <WysiwygEditor
                    label="步骤说明"
                    value={item.description}
                    onChange={(v) => updateCareerStep(index, 'description', v)}
                    minHeight="100px"
                  />
                </CardItem>
              ))}
              {local.careerSteps.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/50 p-8 text-center">
                  <p className="text-sm text-dark-500">暂无步骤，点击上方「添加步骤」按钮新增</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
