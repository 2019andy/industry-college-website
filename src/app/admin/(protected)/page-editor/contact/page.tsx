'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import {
  Field, TextInput, TextArea, SaveBar,
  IconSelect, ColorSelect, CardItem, CardListHeader, nextId,
} from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import type { ContactPageConfig, PageBanner } from '@/lib/types';
import {
  Phone,
  Flag,
  MapPin,
  MessageSquare,
  Headphones,
  Code2,
} from 'lucide-react';

const defaultBanner: PageBanner = {
  title: '联系我们',
  subtitle: '期待与您沟通 · 共筑数字贸易未来',
  breadcrumb: '首页 / 联系我们',
};

const defaultContactPage: ContactPageConfig = {
  banner: defaultBanner,
  infoTitle: '联系方式',
  infoHighlight: '联系方式',
  infoParagraph: '',
  formTitle: '在线留言',
  formHighlight: '在线留言',
  formParagraph: '',
  formSuccessText: '提交成功！我们会尽快与您联系。',
  mapTitle: '来校路线',
  mapSubtitle: '欢迎到访中跨数字贸易产业学院',
  trafficTips: [],
  hotlineTitle: '招生热线',
  hotlinePhone: '400-888-8888',
  hotlineHours: '工作日 09:00 - 18:00',
  hotlineParagraph: '',
};

export default function ContactPageEditor() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<ContactPageConfig>('contactPage');
  const [local, setLocal] = useState<ContactPageConfig | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      setLocal(defaultContactPage);
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

  const patch = <K extends keyof ContactPageConfig>(key: K, value: ContactPageConfig[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
    markDirty();
  };

  const addTrafficTip = () => {
    setLocal((prev) =>
      prev
        ? {
            ...prev,
            trafficTips: [
              ...prev.trafficTips,
              {
                id: nextId(prev.trafficTips),
                icon: 'Car',
                label: '交通方式',
                content: '导航搜索XXX',
                color: 'primary',
              },
            ],
          }
        : prev
    );
    markDirty();
  };

  const removeTrafficTip = (index: number) => {
    setLocal((prev) =>
      prev
        ? {
            ...prev,
            trafficTips: prev.trafficTips.filter((_, i) => i !== index),
          }
        : prev
    );
    markDirty();
  };

  const moveTrafficTip = (index: number, direction: 'up' | 'down') => {
    setLocal((prev) => {
      if (!prev) return prev;
      const arr = [...prev.trafficTips];
      const target = direction === 'up' ? index - 1 : index + 1;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...prev, trafficTips: arr };
    });
    markDirty();
  };

  const updateTrafficTip = <K extends keyof (typeof local.trafficTips)[number]>(
    index: number,
    key: K,
    value: (typeof local.trafficTips)[number][K]
  ) => {
    setLocal((prev) =>
      prev
        ? {
            ...prev,
            trafficTips: prev.trafficTips.map((item, i) =>
              i === index ? { ...item, [key]: value } : item
            ),
          }
        : prev
    );
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
      setLocal(defaultContactPage);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">联系我们页编辑器</h1>
        <p className="text-sm text-dark-500 mt-1">
          编辑「联系我们」二级页面的 Banner、联系方式、在线表单、地图指引、交通贴士、招生热线等
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

        {/* 联系方式 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">联系方式（信息区）</h3>
              <p className="text-xs text-dark-500">联系卡片上方的标题与说明（具体地址/电话/邮箱在【站点内容 → 联系信息】管理）</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.infoTitle} onChange={(v) => patch('infoTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.infoHighlight} onChange={(v) => patch('infoHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落"
            value={local.infoParagraph}
            onChange={(v) => patch('infoParagraph', v)}
            minHeight="120px"
          />
        </div>

        {/* 在线留言 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">在线留言表单</h3>
              <p className="text-xs text-dark-500">联系表单的标题文案与成功提示</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.formTitle} onChange={(v) => patch('formTitle', v)} />
          </Field>
          <Field label="标题高亮关键词">
            <TextInput value={local.formHighlight} onChange={(v) => patch('formHighlight', v)} />
          </Field>
          <WysiwygEditor
            label="描述段落（表单上方说明）"
            value={local.formParagraph}
            onChange={(v) => patch('formParagraph', v)}
            minHeight="120px"
          />
          <WysiwygEditor
            label="提交成功提示文字"
            hint="用户提交成功后在页面显示的反馈语"
            value={local.formSuccessText}
            onChange={(v) => patch('formSuccessText', v)}
            minHeight="80px"
          />
        </div>

        {/* 来校路线 + 交通贴士 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">来校路线 & 交通贴士</h3>
              <p className="text-xs text-dark-500">地图区块标题 + 多种交通方式指引</p>
            </div>
          </div>
          <Field label="地图区标题">
            <TextInput value={local.mapTitle} onChange={(v) => patch('mapTitle', v)} />
          </Field>
          <WysiwygEditor
            label="地图区副标题"
            value={local.mapSubtitle}
            onChange={(v) => patch('mapSubtitle', v)}
            minHeight="80px"
          />

          <div className="mt-6 border-t border-dark-100 pt-5">
            <CardListHeader
              icon={<MapPin className="h-5 w-5" />}
              iconBg="bg-sky-50 text-sky-600"
              title="交通贴士（trafficTips）"
              subtitle="为每种交通方式提供一条路线指引（自驾/公交/地铁/高铁…）"
              addLabel="添加交通贴士"
              count={local.trafficTips.length}
              onAdd={addTrafficTip}
            />

            <div className="space-y-3">
              {local.trafficTips.map((item, index) => (
                <CardItem
                  key={item.id}
                  index={index}
                  title={item.label}
                  subtitle={item.content}
                  accent={item.color}
                  onRemove={() => removeTrafficTip(index)}
                  onMoveUp={index > 0 ? () => moveTrafficTip(index, 'up') : undefined}
                  onMoveDown={
                    index < local.trafficTips.length - 1
                      ? () => moveTrafficTip(index, 'down')
                      : undefined
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <Field label="交通方式标签" hint="如「自驾」「公交」「地铁」">
                      <TextInput
                        value={item.label}
                        onChange={(v) => updateTrafficTip(index, 'label', v)}
                      />
                    </Field>
                    <Field label="色调">
                      <ColorSelect
                        value={item.color}
                        onChange={(v) => updateTrafficTip(index, 'color', v)}
                      />
                    </Field>
                  </div>
                  <Field label="图标">
                    <IconSelect
                      value={item.icon}
                      onChange={(v) => updateTrafficTip(index, 'icon', v)}
                    />
                  </Field>
                  <Field label="路线说明正文 content">
                    <TextArea
                      value={item.content}
                      onChange={(v) => updateTrafficTip(index, 'content', v)}
                      rows={3}
                    />
                  </Field>
                </CardItem>
              ))}
            </div>
          </div>
        </div>

        {/* 招生热线 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">招生热线专区</h3>
              <p className="text-xs text-dark-500">页面底部醒目的 CTA 招生咨询热线</p>
            </div>
          </div>
          <Field label="标题">
            <TextInput value={local.hotlineTitle} onChange={(v) => patch('hotlineTitle', v)} />
          </Field>
          <Field label="热线电话号码" hint="建议 400 开头，例如 400-888-8888">
            <TextInput value={local.hotlinePhone} onChange={(v) => patch('hotlinePhone', v)} />
          </Field>
          <Field label="服务时间">
            <TextInput value={local.hotlineHours} onChange={(v) => patch('hotlineHours', v)} placeholder="例如：工作日 09:00 - 18:00" />
          </Field>
          <WysiwygEditor
            label="补充说明段落（可选）"
            value={local.hotlineParagraph}
            onChange={(v) => patch('hotlineParagraph', v)}
            minHeight="120px"
          />
        </div>

        {/* 提示卡片 */}
        <div className="rounded-2xl border border-primary-100 bg-primary-50/30 p-5">
          <h4 className="font-bold text-primary-800 text-sm mb-2 flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            内容说明
          </h4>
          <ul className="text-xs text-primary-700/80 space-y-1 list-disc list-inside leading-relaxed">
            <li>具体的地址、电话、邮箱、坐标、工作时间等信息在后台左侧【站点内容 → 联系信息】里维护。</li>
            <li>trafficTips 是联系页「交通贴士」部分的内容，建议覆盖自驾、公交、地铁、高铁等几种常见方式。</li>
            <li>formSuccessText 为留言成功提示语，建议包含「我们会在 X 个工作日内联系您」等承诺。</li>
          </ul>
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
