'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ContentSection, SiteContent } from '@/lib/types';

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  message: string | null;
  save: (data: T) => Promise<boolean>;
  reload: () => Promise<void>;
  clearMessage: () => void;
}

export function useContent<T>(section: ContentSection): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/content/${section}`);
      if (!res.ok) throw new Error('加载失败');
      const json = await res.json();
      setData(json.data);
    } catch {
      setError('数据加载失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  }, [section]);

  const save = useCallback(
    async (newData: T): Promise<boolean> => {
      setSaving(true);
      setError(null);
      setMessage(null);
      try {
        const res = await fetch(`/api/admin/content/${section}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newData }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || '保存失败');
        }
        setData(newData);
        setMessage('保存成功');
        setTimeout(() => setMessage(null), 3000);
        return true;
      } catch (e: any) {
        setError(e.message || '保存失败，请重试');
        return false;
      } finally {
        setSaving(false);
      }
    },
    [section]
  );

  const clearMessage = useCallback(() => {
    setError(null);
    setMessage(null);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, saving, error, message, save, reload, clearMessage };
}
