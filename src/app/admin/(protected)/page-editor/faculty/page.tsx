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
import type { FacultyPageConfig, PageBanner, SimpleStat } from '@/lib/types';
import {
  Users,
  Flag,
  Award,
  UserCheck,
  BriefcaseBusiness,
  Rocket,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '师资力量',
  subtitle: '双师型导师团队 · 学界 + 业界双轮驱动',
  breadcrumb: '首页 / 师资力量',
};

const defaultFacultyPage: FacultyPageConfig = {
  banner: defaultBanner,
  teamStrengthTitle: '师资团队实力',
  teamStrengthHighlight: '师资团队',
  teamStrengthParagraph: '',
  teamCards: [],
  dualMentorTitle: '双导师制培养模式',
  dualMentorHighlight: '双导师制',
  dualMentorParagraph: '',
  academicMentor: {
    title: '学术导师',
    subtitle: 'Academic Mentor',
    description: '',
    items: [],
  },
  industryMentor: {
    title: '业界导师',
    subtitle: 'Industry Mentor',
    description: '',
    items: [],
  },
  recruitmentTitle: '加入我们',
  recruitmentHighlight: '加入我们',
  recruitmentParagraph: '',
};

export default function FacultyPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<FacultyPageConfig>('facultyPage');
  const [local, setLocal] = useState<FacultyPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultFacultyPage);
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

  const patch = <K extends keyof FacultyPageConfig>(key: K, value: FacultyPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const patchAcademicMentor = <K extends keyof FacultyPageConfig['academicMentor']>(
    key: K,
    value: FacultyPageConfig['academicMentor'][K]
  ) => {
    setLocal((prev) => (prev ? { ...prev, academicMentor: { ...prev.academicMentor, [key]: value } } : prev));
    markDirty();
  };

  const patchIndustryMentor = <K extends keyof FacultyPageConfig['industryMentor']>(
    key: K,
    value: FacultyPageConfig['industryMentor'][K]
  ) => {
    setLocal((prev) => (prev ? { ...prev, industryMentor: { ...prev.industryMentor, [key]: value } } : prev));
    markDirty();
  };

  const updateTeamCard = (index: number, key: keyof SimpleStat, value: any) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.teamCards];
      newArr[index] = { ...newArr[index], [key]: value };
      return { ...prev, teamCards: newArr };
    });
    markDirty();
  };

  const addTeamCard = () => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newItem: SimpleStat = {
        id: nextId(prev.teamCards),
        icon: 'Users',
        label: '指标名称',
        stat: '80+',
        description: '说明',
        color: 'primary',
      };
      return { ...prev, teamCards: [...prev.teamCards, newItem] };
    });
    markDirty();
  };

  const removeTeamCard = (index: number) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = prev.teamCards.filter((_, i) => i !== index);
      return { ...prev, teamCards: newArr };
    });
    markDirty();
  };

  const moveTeamCard = (index: number, direction: 'up' | 'down') => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.teamCards];
      const target = direction === 'up' ? index - 1 : index + 1;
      [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
      return { ...prev, teamCards: newArr };
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
      setLocal(defaultFacultyPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">师资力量页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「师资力量」二级页面的 Banner、师资数据、双导师制、招聘信息等内容
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

        {/* 师资团队实力 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">师资团队实力</h3>
              <p className="text-xs text-dark-500">教师人数、博士占比、行业经验等数据统计卡</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.teamStrengthTitle} onChange={(v) => patch('teamStrengthTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.teamStrengthHighlight} onChange={(v) => patch('teamStrengthHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.teamStrengthParagraph}
            onChange={(v) => patch('teamStrengthParagraph', v)}
            minHeight="120px"
          />

          <div className="mt-6">
            <CardListHeader
              icon={<Users className="h-5 w-5" />}
              title="师资阵容数据卡片"
              subtitle="教师规模、正副教授、行业导师占比等核心指标"
              addLabel="添加数据卡片"
              onAdd={addTeamCard}
              count={local.teamCards.length}
              iconBg="bg-primary-50 text-primary-600"
            />
            <div className="space-y-3">
              {local.teamCards.map((item, index) => (
                <CardItem
                  key={item.id}
                  index={index}
                  title={item.label}
                  subtitle={`${item.stat} · ${item.description}`}
                  accent={item.color}
                  badge="师资数据"
                  onRemove={() => removeTeamCard(index)}
                  onMoveUp={index > 0 ? () => moveTeamCard(index, 'up') : undefined}
                  onMoveDown={index < local.teamCards.length - 1 ? () => moveTeamCard(index, 'down') : undefined}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Field label="指标名称（如专任教师）">
                      <TextInput value={item.label} onChange={(v) => updateTeamCard(index, 'label', v)} />
                    </Field>
                    <Field label="统计数值（如 80+）">
                      <TextInput value={item.stat} onChange={(v) => updateTeamCard(index, 'stat', v)} />
                    </Field>
                    <Field label="主色调">
                      <ColorSelect value={item.color} onChange={(v) => updateTeamCard(index, 'color', v)} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="图标">
                      <IconSelect value={item.icon} onChange={(v) => updateTeamCard(index, 'icon', v)} />
                    </Field>
                    <Field label="简短副文案（如其中正高20人）">
                      <TextInput value={item.description} onChange={(v) => updateTeamCard(index, 'description', v)} />
                    </Field>
                  </div>
                </CardItem>
              ))}
              {local.teamCards.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/50 p-8 text-center">
                  <p className="text-sm text-dark-500">暂无数据卡片，点击上方「添加数据卡片」按钮新增</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 双导师制 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">双导师制培养模式</h3>
              <p className="text-xs text-dark-500">学术导师 + 业界导师双轨配置</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.dualMentorTitle} onChange={(v) => patch('dualMentorTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.dualMentorHighlight} onChange={(v) => patch('dualMentorHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.dualMentorParagraph}
            onChange={(v) => patch('dualMentorParagraph', v)}
            minHeight="120px"
          />
        </div>

        {/* 学术导师 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">学术导师配置（academicMentor）</h3>
              <p className="text-xs text-dark-500">左侧学术导师的分块内容</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.academicMentor.title} onChange={(v) => patchAcademicMentor('title', v)} />
          </Field>
          <Field label="副标题（英文）">
            <TextInput value={local.academicMentor.subtitle} onChange={(v) => patchAcademicMentor('subtitle', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.academicMentor.description}
            onChange={(v) => patchAcademicMentor('description', v)}
            minHeight="120px"
          />
          <Field label="要点列表（items，一行一项回车添加）" hint="每条将在前端显示为带图标的列表项">
            <StringArrayEditor
              items={local.academicMentor.items}
              onChange={(v) => patchAcademicMentor('items', v)}
              placeholder="输入要点后按回车"
            />
          </Field>
        </div>

        {/* 业界导师 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">业界导师配置（industryMentor）</h3>
              <p className="text-xs text-dark-500">右侧企业导师的分块内容</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.industryMentor.title} onChange={(v) => patchIndustryMentor('title', v)} />
          </Field>
          <Field label="副标题（英文）">
            <TextInput value={local.industryMentor.subtitle} onChange={(v) => patchIndustryMentor('subtitle', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.industryMentor.description}
            onChange={(v) => patchIndustryMentor('description', v)}
            minHeight="120px"
          />
          <Field label="要点列表（items，一行一项回车添加）">
            <StringArrayEditor
              items={local.industryMentor.items}
              onChange={(v) => patchIndustryMentor('items', v)}
              placeholder="输入要点后按回车"
            />
          </Field>
        </div>

        {/* 招聘加入我们 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">招聘 / 加入我们</h3>
              <p className="text-xs text-dark-500">页面底部 CTA 招聘信息区</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.recruitmentTitle} onChange={(v) => patch('recruitmentTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.recruitmentHighlight} onChange={(v) => patch('recruitmentHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落（岗位、投递邮箱等）"
            value={local.recruitmentParagraph}
            onChange={(v) => patch('recruitmentParagraph', v)}
            minHeight="150px"
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
