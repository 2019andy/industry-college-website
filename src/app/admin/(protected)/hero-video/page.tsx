'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, SaveBar, Toggle, Select } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, HeroVideo } from '@/lib/types';
import {
  Video,
  MonitorPlay,
  Eye,
  Play,
  ImageIcon,
  Settings as SettingsIcon,
  Volume2,
  Repeat,
  Smartphone,
} from 'lucide-react';

const defaultHeroVideo: HeroVideo = {
  enabled: true,
  mode: 'player',
  videoUrl: '',
  posterUrl: '',
  autoplay: true,
  loop: true,
  muted: true,
  playsInline: true,
  controlPanelTitle: '走进中跨数字贸易产业学院',
  controlPanelSubtitle: '点击播放，3分钟了解AI赋能产教融合的创新办学模式',
};

export default function HeroVideoPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['heroVideo']>('heroVideo');
  const [local, setLocal] = useState<HeroVideo | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
    } else {
      // 如果后端没有 heroVideo 字段（旧数据），使用默认值
      setLocal(defaultHeroVideo);
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

  const patch = <K extends keyof HeroVideo>(key: K, value: HeroVideo[K]) => {
    setLocal((prev) => (prev ? { ...prev, [key]: value } : prev));
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
      setLocal(defaultHeroVideo);
    }
    setDirty(false);
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">首页视频管理</h1>
        <p className="text-sm text-dark-500 mt-1">
          管理首页 Hero 区域的视频介绍，支持「面板播放模式」和「全屏背景模式」
        </p>
      </div>

      <div className="space-y-6">
        {/* 基础开关 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <SettingsIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-dark-900">基础设置</h3>
                <p className="text-xs text-dark-500">启用视频功能并选择展示模式</p>
              </div>
            </div>
            <Toggle
              checked={local.enabled}
              onChange={(v) => patch('enabled', v)}
              label={local.enabled ? '已启用' : '已关闭'}
            />
          </div>

          <div className={local.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
            <Field label="展示模式" required hint="player: 在右侧主视觉面板中播放；background: 作为全屏背景视频播放">
              <Select
                value={local.mode}
                onChange={(v) => patch('mode', v as 'player' | 'background')}
                options={[
                  { value: 'player', label: '面板播放模式（推荐） - 视频位于首屏右侧主视觉区' },
                  { value: 'background', label: '全屏背景模式 - 视频铺满全屏 Hero 区域' },
                ]}
              />
            </Field>
          </div>
        </div>

        {/* 资源地址 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">视频资源</h3>
              <p className="text-xs text-dark-500">配置视频 URL 和封面图（支持 mp4 / webm 等浏览器兼容格式）</p>
            </div>
          </div>

          <Field label="视频地址 (URL)" required hint="例如：https://your-cdn.com/promo.mp4 或 /videos/promo.mp4">
            <TextInput
              value={local.videoUrl}
              onChange={(v) => patch('videoUrl', v)}
              placeholder="请输入视频文件的可公开访问地址"
            />
          </Field>

          <Field label="封面图地址 (Poster)" hint="视频加载前的预览图，建议尺寸 9:16 或 16:9 高清图">
            <TextInput
              value={local.posterUrl}
              onChange={(v) => patch('posterUrl', v)}
              placeholder="请输入封面图 URL（留空时无封面）"
            />
          </Field>

          {/* 实时预览 */}
          <div className="mt-2 rounded-2xl border border-dark-200 bg-dark-950 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <Eye className="h-4 w-4 text-gold-400" />
              <span className="text-xs font-semibold text-white/70">实时预览（封面 + 视频）</span>
            </div>
            <div className="aspect-video bg-black">
              {local.videoUrl ? (
                <video
                  className="w-full h-full object-contain bg-black"
                  src={local.videoUrl}
                  poster={local.posterUrl || undefined}
                  controls
                  muted
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dark-400 text-sm">
                  请填写视频地址后预览
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 播放行为 */}
        <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Play className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-dark-900">播放行为</h3>
              <p className="text-xs text-dark-500">
                注意：根据浏览器策略，自动播放的视频必须同时设置为静音（muted=true），否则可能无法自动播放
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <Field label="自动播放 (autoplay)">
              <Toggle
                checked={local.autoplay}
                onChange={(v) => patch('autoplay', v)}
                label={local.autoplay ? '页面加载后自动开始播放' : '需要用户手动点击播放'}
              />
            </Field>
            <Field label="循环播放 (loop)">
              <Toggle
                checked={local.loop}
                onChange={(v) => patch('loop', v)}
                label={local.loop ? '播放完毕后自动从头循环' : '播放一次即停止'}
              />
            </Field>
            <Field label="静音 (muted)">
              <Toggle
                checked={local.muted}
                onChange={(v) => patch('muted', v)}
                label={
                  local.muted
                    ? '视频默认静音（用户可在界面取消静音）——推荐开启，保障自动播放'
                    : '视频有声音输出'
                }
              />
            </Field>
            <Field label="内联播放 (playsInline)">
              <Toggle
                checked={local.playsInline}
                onChange={(v) => patch('playsInline', v)}
                label={
                  local.playsInline
                    ? '在移动端 Safari 内联播放（不自动进入全屏）——推荐开启'
                    : '在移动端可能触发系统全屏播放器'
                }
              />
            </Field>
          </div>
        </div>

        {/* 面板文案（仅在非背景模式下展示） */}
        {local.mode === 'player' && (
          <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <MonitorPlay className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-dark-900">面板标题与说明</h3>
                <p className="text-xs text-dark-500">当模式为「面板播放」时，视频面板上的标题和副标题文字</p>
              </div>
            </div>

            <Field label="视频面板标题" required hint="显示在视频面板顶部，例如：走进中跨数字贸易产业学院">
              <TextInput
                value={local.controlPanelTitle}
                onChange={(v) => patch('controlPanelTitle', v)}
                placeholder="视频面板标题"
              />
            </Field>

            <Field label="视频面板副标题" hint="显示在标题下方的小字号说明">
              <TextInput
                value={local.controlPanelSubtitle}
                onChange={(v) => patch('controlPanelSubtitle', v)}
                placeholder="副标题文字"
              />
            </Field>
          </div>
        )}

        {/* 模式对比卡片 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className={
            'rounded-2xl border-2 p-5 transition-all ' +
            (local.mode === 'player'
              ? 'border-primary-500 bg-primary-50/40'
              : 'border-dark-100 bg-white')
          }>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
                <MonitorPlay className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-dark-900">面板播放模式</h4>
                <p className="text-xs text-dark-500">mode = player</p>
              </div>
            </div>
            <p className="text-sm text-dark-600 leading-relaxed">
              视频位于 Hero 右侧主视觉面板内，配合浮动卡片展示。保留原有设计布局的层次感，
              适合宣传视频内容。
            </p>
          </div>

          <div className={
            'rounded-2xl border-2 p-5 transition-all ' +
            (local.mode === 'background'
              ? 'border-gold-500 bg-gold-50/40'
              : 'border-dark-100 bg-white')
          }>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-dark-900">全屏背景模式</h4>
                <p className="text-xs text-dark-500">mode = background</p>
              </div>
            </div>
            <p className="text-sm text-dark-600 leading-relaxed">
              视频铺满整个 Hero 区域，搭配深色蒙层显示文字内容。视觉冲击力强，适合高质量航拍/电影感宣传片。
            </p>
          </div>
        </div>

        {/* 配置说明卡片 */}
        <div className="rounded-2xl border border-primary-100 bg-primary-50/30 p-5">
          <h4 className="font-bold text-primary-800 text-sm mb-2 flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            浏览器自动播放策略说明
          </h4>
          <ul className="text-xs text-primary-700/80 space-y-1 list-disc list-inside leading-relaxed">
            <li>Chrome / Safari / Edge 等现代浏览器默认禁止「带声音且自动播放」的视频。</li>
            <li>想要实现自动播放，必须设置「静音 = 开启」，同时「自动播放 = 开启」。</li>
            <li>「内联播放 playsInline」可以防止 iOS Safari 强制弹出全屏播放器，建议始终开启。</li>
            <li>视频建议使用 H.264 + AAC 编码的 mp4 格式，并使用 CDN 加速加载。</li>
            <li>视频文件大小建议控制在 15MB 以内，封面图优先于首屏秒开体验。</li>
          </ul>
          <h4 className="font-bold text-primary-800 text-sm mt-3 mb-1 flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            保存生效
          </h4>
          <p className="text-xs text-primary-700/80">
            修改后点击底部「保存内容」，刷新官网首页即可看到最新效果。视频功能由【content.heroVideo.enabled】控制。
          </p>
          <h4 className="font-bold text-primary-800 text-sm mt-3 mb-1 flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            响应式说明
          </h4>
          <p className="text-xs text-primary-700/80">
            移动端（小屏幕）主视觉面板默认隐藏，视频仅通过「观看学院介绍视频」按钮全屏播放，不影响阅读体验。
          </p>
        </div>
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
