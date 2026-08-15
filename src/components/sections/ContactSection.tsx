'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ContactInfo } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ContactSection({ contactInfo }: { contactInfo: ContactInfo }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-gold-50" />

      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Info */}
          <div>
            <span className="inline-flex items-center rounded-full bg-white border border-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 tracking-wider mb-5 shadow-sm">
              CONTACT · 联系我们
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-6 leading-tight">
              开启您的
              <span className="heading-gradient"> 数字贸易</span>
              <br />
              职业成长之旅
            </h2>
            <p className="text-base md:text-lg text-dark-600 leading-relaxed mb-10 max-w-xl">
              无论您是咨询招生信息、校企合作、还是职业规划，我们的顾问团队随时为您提供一对一专业解答。
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <MapPin className="h-5 w-5" />,
                  label: '学院地址',
                  value: contactInfo.address,
                  color: 'from-primary-500 to-primary-700',
                },
                {
                  icon: <Phone className="h-5 w-5" />,
                  label: '招生热线',
                  value: contactInfo.phone,
                  href: `tel:${contactInfo.phone}`,
                  color: 'from-green-500 to-green-700',
                },
                {
                  icon: <Mail className="h-5 w-5" />,
                  label: '邮件咨询',
                  value: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                  color: 'from-gold-500 to-gold-700',
                },
              ].map((item, i) => {
                const Comp: any = item.href ? 'a' : 'div';
                return (
                  <Comp
                    key={i}
                    href={item.href}
                    className={cn(
                      'flex items-start gap-4 p-5 rounded-2xl bg-white border border-dark-100/80 shadow-card',
                      item.href && 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all'
                    )}
                  >
                    <div className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md',
                      item.color
                    )}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-dark-500 mb-1">{item.label}</div>
                      <div className="text-base md:text-lg font-semibold text-dark-900 break-all">
                        {item.value}
                      </div>
                    </div>
                  </Comp>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 h-full w-full rounded-[2rem] bg-gradient-to-br from-gold-400/20 to-primary-500/20 blur-2xl" />
            <div className="relative rounded-3xl bg-white border border-dark-100 shadow-card-hover p-7 md:p-9">
              <div className="mb-7">
                <h3 className="text-2xl font-bold text-dark-900 mb-2">留下您的信息</h3>
                <p className="text-sm text-dark-600">招生老师将在24小时内与您取得联系</p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600 mb-5">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="text-xl font-bold text-dark-900 mb-2">提交成功！</h4>
                  <p className="text-dark-600 max-w-xs text-sm">
                    感谢您对中跨数字贸易产业学院的关注，我们的招生顾问将尽快与您联系。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-dark-700 mb-1.5">
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
                      <label className="block text-xs font-semibold text-dark-700 mb-1.5">
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
                    <label className="block text-xs font-semibold text-dark-700 mb-1.5">
                      意向专业
                    </label>
                    <select className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10">
                      <option>请选择意向专业</option>
                      <option>跨境电子商务</option>
                      <option>国际商务（数字贸易方向）</option>
                      <option>数字营销（跨境方向）</option>
                      <option>供应链管理（国际物流）</option>
                      <option>暂未确定，需要咨询</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark-700 mb-1.5">
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
                    <label className="block text-xs font-semibold text-dark-700 mb-1.5">
                      留言备注
                    </label>
                    <textarea
                      rows={3}
                      placeholder="请描述您的疑问或需求（选填）"
                      className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-dark-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full py-3.5 text-base">
                    <Send className="h-4 w-4" />
                    立即提交咨询
                  </button>

                  <p className="text-[11px] text-dark-500 text-center leading-relaxed">
                    提交即表示您同意我们的
                    <a href="#" className="text-primary-600 hover:underline">隐私政策</a>
                    ，我们将妥善保管您的个人信息，不会向第三方泄露。
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
