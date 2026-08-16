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
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import type { AboutPageConfig, PageBanner, IconCard, TimelineItem, IconName } from '@/lib/types';
import {
  Building2,
  Flag,
  Eye,
  Users,
  Code2,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '学院概况',
  subtitle: '走进中跨数字贸易产业学院',
  breadcrumb: '首页 / 学院概况',
};

const defaultAboutPage: AboutPageConfig = {
  banner: defaultBanner,
  introTitle: '关于中跨数字贸易产业学院',
  introTitleHighlight: '中跨数字贸易产业学院',
  introPrimaryParagraph: '',
  introSecondaryParagraph: '',
  visionCards: [],
  timeline: [],
  leadershipTitle: '学院领导团队',
  leadershipHighlight: '领导团队',
  leadershipParagraph: '',
  leadershipMembers: [],
};

type LeadershipMember = AboutPageConfig['leadershipMembers'][number];

export default function AboutPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<AboutPageConfig>('aboutPage');
  const [local, setLocal] = useState<AboutPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultAboutPage);
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

  const patch = <K extends keyof AboutPageConfig>(key: K, value: AboutPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const patchVisionCard = (index: number, updates: Partial<IconCard>) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.visionCards];
      newArr[index] = { ...newArr[index], ...updates };
      return { ...prev, visionCards: newArr };
    });
    markDirty();
  };

  const removeVisionCard = (index: number) => {
    setLocal((prev) => prev ? { ...prev, visionCards: prev.visionCards.filter((_, i) => i !== index) } : prev);
    markDirty();
  };

  const moveVisionCardUp = (index: number) => {
    setLocal((prev) => {
      if (!prev || index === 0) return prev;
      const newArr = [...prev.visionCards];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return { ...prev, visionCards: newArr };
    });
    markDirty();
  };

  const moveVisionCardDown = (index: number) => {
    setLocal((prev) => {
      if (!prev || index >= prev.visionCards.length - 1) return prev;
      const newArr = [...prev.visionCards];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      return { ...prev, visionCards: newArr };
    });
    markDirty();
  };

  const addVisionCard = () => {
    setLocal((prev) => prev ? {
      ...prev,
      visionCards: [...prev.visionCards, {
        id: nextId(prev.visionCards),
        icon: 'Target',
        label: '标签',
        title: '卡片标题',
        description: '<p></p>',
        color: 'primary',
      }],
    } : prev);
    markDirty();
  };

  const patchTimelineItem = (index: number, updates: Partial<TimelineItem>) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.timeline];
      newArr[index] = { ...newArr[index], ...updates };
      return { ...prev, timeline: newArr };
    });
    markDirty();
  };

  const removeTimelineItem = (index: number) => {
    setLocal((prev) => prev ? { ...prev, timeline: prev.timeline.filter((_, i) => i !== index) } : prev);
    markDirty();
  };

  const moveTimelineItemUp = (index: number) => {
    setLocal((prev) => {
      if (!prev || index === 0) return prev;
      const newArr = [...prev.timeline];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return { ...prev, timeline: newArr };
    });
    markDirty();
  };

  const moveTimelineItemDown = (index: number) => {
    setLocal((prev) => {
      if (!prev || index >= prev.timeline.length - 1) return prev;
      const newArr = [...prev.timeline];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      return { ...prev, timeline: newArr };
    });
    markDirty();
  };

  const addTimelineItem = () => {
    setLocal((prev) => prev ? {
      ...prev,
      timeline: [...prev.timeline, {
        id: nextId(prev.timeline),
        year: '2025',
        title: '新的里程碑',
        description: '<p></p>',
        icon: 'Sparkles',
        milestone: '里程碑',
      }],
    } : prev);
    markDirty();
  };

  const patchLeadershipMember = (index: number, updates: Partial<LeadershipMember>) => {
    setLocal((prev) => {
      if (!prev) return prev;
      const newArr = [...prev.leadershipMembers];
      newArr[index] = { ...newArr[index], ...updates };
      return { ...prev, leadershipMembers: newArr };
    });
    markDirty();
  };

  const removeLeadershipMember = (index: number) => {
    setLocal((prev) => prev ? { ...prev, leadershipMembers: prev.leadershipMembers.filter((_, i) => i !== index) } : prev);
    markDirty();
  };

  const moveLeadershipMemberUp = (index: number) => {
    setLocal((prev) => {
      if (!prev || index === 0) return prev;
      const newArr = [...prev.leadershipMembers];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return { ...prev, leadershipMembers: newArr };
    });
    markDirty();
  };

  const moveLeadershipMemberDown = (index: number) => {
    setLocal((prev) => {
      if (!prev || index >= prev.leadershipMembers.length - 1) return prev;
      const newArr = [...prev.leadershipMembers];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      return { ...prev, leadershipMembers: newArr };
    });
    markDirty();
  };

  const addLeadershipMember = () => {
    setLocal((prev) => prev ? {
      ...prev,
      leadershipMembers: [...prev.leadershipMembers, {
        id: nextId(prev.leadershipMembers),
        name: '姓名',
        position: '职务',
        tagline: '职称/标签',
        description: '<p></p>',
        photo: '',
        accent: 'primary',
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
      setLocal(defaultAboutPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">学院概况页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「学院概况」二级页面的 Banner、简介、办学理念、发展历程、领导团队等内容
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
            <TextInput value={local.banner.title} onChange={(v) => patchBanner('title', v)} placeholder="例如：学院概况" />
          </Field>
          <Field label="Banner 副标题">
            <TextInput value={local.banner.subtitle} onChange={(v) => patchBanner('subtitle', v)} placeholder="例如：走进中跨数字贸易产业学院" />
          </Field>
          <Field label="面包屑文字">
            <TextInput value={local.banner.breadcrumb} onChange={(v) => patchBanner('breadcrumb', v)} placeholder="例如：首页 / 学院概况" />
          </Field>
        </div>

        {/* 学院简介 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">学院简介</h3>
              <p className="text-xs text-dark-500">页面开篇的学院介绍文字区</p>
            </div>
          </div>
          <Field label="主标题" required>
            <TextInput value={local.introTitle} onChange={(v) => patch('introTitle', v)} placeholder="例如：关于中跨数字贸易产业学院" />
          </Field>
          <Field label="标题中高亮的关键词" hint="在主标题中会被特别样式强调的那部分文字">
            <TextInput value={local.introTitleHighlight} onChange={(v) => patch('introTitleHighlight', v)} placeholder="例如：中跨数字贸易产业学院" />
          </Field>
          <WysiwygEditor
            label="主段落（第一段）"
            hint="开篇大段介绍文字"
            value={local.introPrimaryParagraph}
            onChange={(v) => patch('introPrimaryParagraph', v)}
            placeholder="第一段主要介绍..."
            minHeight="180px"
          />
          <WysiwygEditor
            label="次段落（第二段）"
            hint="补充说明文字"
            value={local.introSecondaryParagraph}
            onChange={(v) => patch('introSecondaryParagraph', v)}
            placeholder="第二段补充说明..."
            minHeight="150px"
          />
        </div>

        {/* 办学理念 / 愿景卡片 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <CardListHeader
            icon={<Eye className="h-5 w-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
            title="办学理念 / 愿景卡片"
            subtitle="每张卡片对应前端的使命/愿景/价值观等条目"
            addLabel="添加愿景卡片"
            count={local.visionCards.length}
            onAdd={addVisionCard}
          />
          <div className="space-y-3">
            {local.visionCards.map((item, index) => (
              <CardItem
                key={item.id}
                index={index}
                title={item.title}
                subtitle={item.label}
                accent={item.color}
                onRemove={() => removeVisionCard(index)}
                onMoveUp={index > 0 ? () => moveVisionCardUp(index) : undefined}
                onMoveDown={index < local.visionCards.length - 1 ? () => moveVisionCardDown(index) : undefined}
              >
                <Field label="标签（简短）">
                  <TextInput value={item.label} onChange={(v) => patchVisionCard(index, { label: v })} placeholder="例如：愿景" />
                </Field>
                <Field label="标题">
                  <TextInput value={item.title} onChange={(v) => patchVisionCard(index, { title: v })} placeholder="例如：成为一流产业学院" />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="图标">
                    <IconSelect value={item.icon} onChange={(v) => patchVisionCard(index, { icon: v as IconName })} />
                  </Field>
                  <Field label="颜色">
                    <ColorSelect value={item.color} onChange={(v) => patchVisionCard(index, { color: v })} />
                  </Field>
                </div>
                <WysiwygEditor
                  label="卡片描述"
                  value={item.description}
                  onChange={(v) => patchVisionCard(index, { description: v })}
                  minHeight="120px"
                />
              </CardItem>
            ))}
            {local.visionCards.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/40 p-8 text-center">
                <p className="text-sm text-dark-500">暂无愿景卡片，点击上方「添加愿景卡片」开始创建</p>
              </div>
            )}
          </div>
        </div>

        {/* 发展历程时间轴 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <CardListHeader
            icon={<Sparkles className="h-5 w-5" />}
            iconBg="bg-gold-50 text-gold-600"
            title="发展历程时间轴"
            subtitle="每年的里程碑事件"
            addLabel="添加时间轴节点"
            count={local.timeline.length}
            onAdd={addTimelineItem}
          />
          <div className="space-y-3">
            {local.timeline.map((item, index) => (
              <CardItem
                key={item.id}
                index={index}
                title={item.title}
                subtitle={`${item.year} · ${item.milestone}`}
                badge="时间轴"
                onRemove={() => removeTimelineItem(index)}
                onMoveUp={index > 0 ? () => moveTimelineItemUp(index) : undefined}
                onMoveDown={index < local.timeline.length - 1 ? () => moveTimelineItemDown(index) : undefined}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="年份">
                    <TextInput value={item.year} onChange={(v) => patchTimelineItem(index, { year: v })} placeholder="例如：2024" />
                  </Field>
                  <Field label="里程碑标签">
                    <TextInput value={item.milestone} onChange={(v) => patchTimelineItem(index, { milestone: v })} placeholder="例如：学院成立" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="图标">
                    <IconSelect value={item.icon} onChange={(v) => patchTimelineItem(index, { icon: v as IconName })} />
                  </Field>
                  <Field label="标题">
                    <TextInput value={item.title} onChange={(v) => patchTimelineItem(index, { title: v })} placeholder="例如：正式揭牌成立" />
                  </Field>
                </div>
                <WysiwygEditor
                  label="节点描述"
                  value={item.description}
                  onChange={(v) => patchTimelineItem(index, { description: v })}
                  minHeight="100px"
                />
              </CardItem>
            ))}
            {local.timeline.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/40 p-8 text-center">
                <p className="text-sm text-dark-500">暂无时间轴节点，点击上方「添加时间轴节点」开始创建</p>
              </div>
            )}
          </div>
        </div>

        {/* 领导团队 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">学院领导团队</h3>
              <p className="text-xs text-dark-500">领导团队标题与成员列表</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.leadershipTitle} onChange={(v) => patch('leadershipTitle', v)} placeholder="例如：学院领导团队" />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.leadershipHighlight} onChange={(v) => patch('leadershipHighlight', v)} placeholder="例如：领导团队" />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.leadershipParagraph}
            onChange={(v) => patch('leadershipParagraph', v)}
            placeholder="领导团队整体介绍..."
            minHeight="120px"
          />
          <CardListHeader
            title="学院领导成员"
            subtitle="配置院长、书记等管理者信息"
            addLabel="添加领导成员"
            count={local.leadershipMembers.length}
            onAdd={addLeadershipMember}
          />
          <div className="space-y-3 mt-2">
            {local.leadershipMembers.map((item, index) => (
              <CardItem
                key={item.id}
                index={index}
                title={item.name}
                subtitle={`${item.position}｜${item.tagline}`}
                accent={item.accent}
                onRemove={() => removeLeadershipMember(index)}
                onMoveUp={index > 0 ? () => moveLeadershipMemberUp(index) : undefined}
                onMoveDown={index < local.leadershipMembers.length - 1 ? () => moveLeadershipMemberDown(index) : undefined}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Field label="姓名">
                    <TextInput value={item.name} onChange={(v) => patchLeadershipMember(index, { name: v })} placeholder="例如：张三" />
                  </Field>
                  <Field label="职务">
                    <TextInput value={item.position} onChange={(v) => patchLeadershipMember(index, { position: v })} placeholder="例如：院长" />
                  </Field>
                  <Field label="职称/标签">
                    <TextInput value={item.tagline} onChange={(v) => patchLeadershipMember(index, { tagline: v })} placeholder="例如：教授/博导" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="色调（accent）">
                    <ColorSelect value={item.accent} onChange={(v) => patchLeadershipMember(index, { accent: v })} />
                  </Field>
                </div>
                <ImageUploader
                  label="领导照片（可选）"
                  value={item.photo}
                  onChange={(v) => patchLeadershipMember(index, { photo: v || undefined })}
                  allowEmpty
                  emptyLabel="移除照片"
                  previewHeight="h-44"
                  hint="支持两种方式：① 本地上传（会自动保存至 /uploads 目录并返回持久化路径）；② 填写已有的服务器路径或外链 URL（例如 /img/leader.jpg 或 https://cdn.xxx/a.jpg）。"
                />
                <WysiwygEditor
                  label="个人简介"
                  value={item.description}
                  onChange={(v) => patchLeadershipMember(index, { description: v })}
                  minHeight="120px"
                />
              </CardItem>
            ))}
            {local.leadershipMembers.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-dark-200 bg-dark-50/40 p-8 text-center">
                <p className="text-sm text-dark-500">暂无领导成员，点击上方「添加领导成员」开始创建</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
