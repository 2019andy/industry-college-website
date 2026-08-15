'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { Field, TextInput, SaveBar } from '@/components/admin/FormFields';
import { Toast } from '@/components/admin/Toast';
import type { SiteContent, ContactInfo } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, MessageCircle, QrCode } from 'lucide-react';

export default function ContactPage() {
  const { data, loading, saving, error, message, save, clearMessage } =
    useContent<SiteContent['contactInfo']>('contactInfo');
  const [local, setLocal] = useState<ContactInfo | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setLocal(data);
      setDirty(false);
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

  const update = (patch: Partial<ContactInfo>) => {
    setLocal((prev) => (prev ? { ...prev, ...patch } : prev));
    setDirty(true);
  };

  const updateCoord = (patch: Partial<ContactInfo['coordinates']>) => {
    setLocal((prev) =>
      prev ? { ...prev, coordinates: { ...prev.coordinates, ...patch } } : prev
    );
    setDirty(true);
  };

  const handleSave = async () => {
    const ok = await save(local);
    if (ok) setDirty(false);
  };

  const handleReset = () => {
    if (data) {
      setLocal(data);
      setDirty(false);
    }
  };

  return (
    <div>
      <Toast message={message} type="success" onClose={clearMessage} />
      <Toast message={error} type="error" onClose={clearMessage} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-900">联系信息</h1>
        <p className="text-sm text-dark-500 mt-1">管理学院联系方式、地址与地图坐标</p>
      </div>

      <div className="rounded-2xl bg-white border border-dark-100 p-6 shadow-sm">
        <Field label="学院地址" required>
          <TextInput
            value={local.address}
            onChange={(v) => update({ address: v })}
            placeholder="如：某省某市某区某路某号"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="联系电话" required>
            <TextInput
              value={local.phone}
              onChange={(v) => update({ phone: v })}
              placeholder="如：010-12345678"
            />
          </Field>
          <Field label="邮箱" required>
            <TextInput
              type="email"
              value={local.email}
              onChange={(v) => update({ email: v })}
              placeholder="如：contact@example.edu.cn"
            />
          </Field>
        </div>

        <Field label="办公时间">
          <TextInput
            value={local.workHours}
            onChange={(v) => update({ workHours: v })}
            placeholder="如：周一至周五 8:30-17:30"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="QQ群" hint="学生咨询QQ群号">
            <TextInput
              value={local.qqGroup}
              onChange={(v) => update({ qqGroup: v })}
              placeholder="如：123456789"
            />
          </Field>
          <Field label="微信公众号" hint="微信公众号名称或ID">
            <TextInput
              value={local.wechatOfficial}
              onChange={(v) => update({ wechatOfficial: v })}
              placeholder="如：中跨数字贸易产业学院"
            />
          </Field>
        </div>

        <div className="rounded-xl bg-dark-50/60 border border-dark-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-semibold text-dark-800">地图坐标</span>
            <span className="text-xs text-dark-400">（用于官网地图定位）</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="经度 (lng)">
              <TextInput
                type="number"
                value={String(local.coordinates.lng)}
                onChange={(v) => updateCoord({ lng: Number(v) || 0 })}
                placeholder="如 116.404"
              />
            </Field>
            <Field label="纬度 (lat)">
              <TextInput
                type="number"
                value={String(local.coordinates.lat)}
                onChange={(v) => updateCoord({ lat: Number(v) || 0 })}
                placeholder="如 39.915"
              />
            </Field>
          </div>
        </div>
      </div>

      {/* 快捷预览卡片 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { icon: Phone, label: '电话', value: local.phone },
          { icon: Mail, label: '邮箱', value: local.email },
          { icon: Clock, label: '办公时间', value: local.workHours },
          { icon: MapPin, label: '地址', value: local.address },
          { icon: MessageCircle, label: 'QQ群', value: local.qqGroup },
          { icon: QrCode, label: '微信公众号', value: local.wechatOfficial },
        ].map((info) => {
          const Icon = info.icon;
          return (
            <div
              key={info.label}
              className="rounded-xl bg-white border border-dark-100 p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-primary-600" />
                <span className="text-xs font-semibold text-dark-500">{info.label}</span>
              </div>
              <p className="text-sm text-dark-800 break-all">{info.value || '—'}</p>
            </div>
          );
        })}
      </div>

      <SaveBar onSave={handleSave} onReset={handleReset} saving={saving} dirty={dirty} />
    </div>
  );
}
