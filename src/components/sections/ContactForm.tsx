'use client';

import { useState } from 'react';
import { Send, CheckCircle2, User, Phone, GraduationCap, BookOpen, MessageSquare } from 'lucide-react';
import SafeHtml from '@/components/SafeHtml';

interface ContactFormProps {
  successText?: string;
}

export default function ContactForm({ successText }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-600 mb-6 animate-scale-in">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h3 className="text-2xl font-bold text-dark-900 mb-3">提交成功！</h3>
        <SafeHtml
          html={
            successText ??
            '感谢您对中跨数字贸易产业学院的关注，我们的招生顾问将在24小时内与您联系。'
          }
          variant="body"
          className="text-dark-600 max-w-sm"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-dark-700 mb-2">
            <User className="h-3.5 w-3.5 text-primary-600" />
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="请输入您的姓名"
            className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-dark-700 mb-2">
            <Phone className="h-3.5 w-3.5 text-primary-600" />
            手机号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="请输入手机号"
            className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-dark-700 mb-2">
          <BookOpen className="h-3.5 w-3.5 text-primary-600" />
          意向专业
        </label>
        <select className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10">
          <option>请选择意向专业</option>
          <option>人工智能技术与应用</option>
          <option>AI应用开发（产业方向）</option>
          <option>跨境电子商务</option>
          <option>国际商务（数字贸易方向）</option>
          <option>数字营销（跨境方向）</option>
          <option>供应链管理（国际物流）</option>
          <option>暂未确定，需要咨询</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-dark-700 mb-2">
          <GraduationCap className="h-3.5 w-3.5 text-primary-600" />
          学历背景
        </label>
        <select className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10">
          <option>请选择当前学历</option>
          <option>高中/中专应届</option>
          <option>高中/中专往届</option>
          <option>大专在读/毕业</option>
          <option>本科及以上</option>
          <option>在职转行</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-dark-700 mb-2">
          <MessageSquare className="h-3.5 w-3.5 text-primary-600" />
          留言备注
        </label>
        <textarea
          rows={4}
          placeholder="请描述您的疑问或需求（选填）"
          className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 resize-none"
        />
      </div>

      <button type="submit" className="btn-gold w-full py-4 text-base">
        <Send className="h-4 w-4" />
        立即提交咨询
      </button>

      <p className="text-[11px] text-dark-500 text-center leading-relaxed">
        提交即表示您同意我们的
        <a href="#" className="text-primary-600 hover:underline">隐私政策</a>
        ，我们将妥善保管您的个人信息，不会向第三方泄露。
      </p>
    </form>
  );
}
