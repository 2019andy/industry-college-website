'use client';

import { useEffect } from 'react';
import { CheckCircle2, XCircle, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const config = {
    success: { icon: CheckCircle2, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', iconColor: 'text-green-500' },
    error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
    info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
  };
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-fade-in-up">
      <div className={cn('flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-lg', c.bg, c.border)}>
        <Icon className={cn('h-5 w-5', c.iconColor)} />
        <span className={cn('text-sm font-medium', c.text)}>{message}</span>
        <button onClick={onClose} className="ml-2 text-dark-400 hover:text-dark-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
