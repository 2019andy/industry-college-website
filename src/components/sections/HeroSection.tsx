'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  PlayCircle,
  PauseCircle,
  GraduationCap,
  Briefcase,
  Globe,
  TrendingUp,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { HeroStat, HeroVideo } from '@/lib/types';
import { formatNumber, cn } from '@/lib/utils';

export default function HeroSection({
  heroStats,
  heroVideo,
}: {
  heroStats: HeroStat[];
  heroVideo?: HeroVideo;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(heroVideo?.muted ?? true);
  const [showModal, setShowModal] = useState(false);

  const videoEnabled = heroVideo?.enabled ?? false;
  const useBackground = videoEnabled && heroVideo?.mode === 'background' && !!heroVideo.videoUrl;
  const usePlayer = videoEnabled && heroVideo?.mode === 'player' && !!heroVideo.videoUrl;

  // Background video sync state
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [useBackground, usePlayer]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    const mv = modalVideoRef.current;
    if (mv) mv.pause();
    setShowModal(false);
  };

  // ESC 关闭模态
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  return (
    <>
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero-gradient pt-28 pb-20">
        {/* Background video layer (fullscreen) */}
        {useBackground && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={heroVideo.videoUrl}
            poster={heroVideo.posterUrl || undefined}
            autoPlay={heroVideo.autoplay}
            loop={heroVideo.loop}
            muted={heroVideo.muted}
            playsInline={heroVideo.playsInline}
            preload="metadata"
          />
        )}

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 背景视频蒙层 */}
          {useBackground && (
            <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-[1px]" />
          )}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          {!useBackground && (
            <>
              <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
              <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="absolute top-10 right-1/4 h-40 w-40 rounded-full bg-white/5 blur-2xl animate-float" />
            </>
          )}
        </div>

        {/* Background video controls (floating) */}
        {useBackground && (
          <div className="absolute bottom-24 right-6 z-30 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-2">
            <button
              onClick={togglePlay}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label={isMuted ? '取消静音' : '静音'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              onClick={openModal}
              className="h-9 px-3 flex items-center gap-1.5 rounded-full bg-gold-500/90 text-white hover:bg-gold-500 transition text-xs font-semibold"
            >
              <PlayCircle className="h-4 w-4" />
              全屏观看
            </button>
          </div>
        )}

        {/* Container */}
        <div className="container-page relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              国家级现代产业学院 · AI赋能产教融合
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="block">AI驱动</span>
              <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                产教融合
              </span>
              <span className="block">培育数字经济人才</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mb-10">
              中跨数字贸易产业学院，由高校与中跨集团深度共建。聚焦人工智能与跨境电商两大核心方向，
              以AI技术赋能真实产业项目驱动教学，校企双导师联合授课，让您在毕业时即拥有2年+行业实战经验。
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-14">
              <Link href="/programs" className="btn-gold text-base px-8 py-4">
                探索专业方向
                <ArrowRight className="h-5 w-5" />
              </Link>
              {!useBackground ? (
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/15 transition-all"
                >
                  <PlayCircle className="h-5 w-5 text-gold-400" />
                  观看学院介绍视频
                </button>
              ) : (
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/15 transition-all"
                >
                  了解学院概况
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {heroStats.map((s, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -top-2 -left-1 h-8 w-8 rounded-lg bg-gradient-to-br from-gold-400/30 to-gold-500/0 blur-sm" />
                  <div className="relative">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white">
                        {formatNumber(s.value)}
                      </span>
                      <span className="text-gold-400 font-bold">{s.suffix}</span>
                    </div>
                    <div className="text-xs md:text-sm text-white/60">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual - 视频播放模式 / 图片 / 背景模式时隐藏主视觉*/}
          <div className="relative hidden lg:block">
            <div className="absolute -top-6 -left-6 h-full w-full rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-sm" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
              {usePlayer ? (
                <div className="relative group">
                  <video
                    ref={videoRef}
                    className="w-full h-[580px] object-cover"
                    src={heroVideo.videoUrl}
                    poster={heroVideo.posterUrl || undefined}
                    autoPlay={heroVideo.autoplay && heroVideo.muted}
                    loop={heroVideo.loop}
                    muted={heroVideo.muted}
                    playsInline={heroVideo.playsInline}
                    preload="metadata"
                  />
                  {/* Video overlay UI */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-dark-950/40" />

                  {/* Top title */}
                  <div className="absolute top-5 left-5 right-5 text-white">
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 mb-2">
                      <GraduationCap className="h-3.5 w-3.5 text-gold-400" />
                      学院官方宣传片
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                      {heroVideo.controlPanelTitle}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      {heroVideo.controlPanelSubtitle}
                    </p>
                  </div>

                  {/* Center play button */}
                  <button
                    onClick={togglePlay}
                    className={cn(
                      'absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/95 text-white shadow-gold ring-4 ring-white/30 transition-all group-hover:scale-110',
                      'hover:bg-gold-500',
                      isPlaying && 'opacity-0 group-hover:opacity-100'
                    )}
                    aria-label={isPlaying ? '暂停视频' : '播放视频'}
                  >
                    {isPlaying ? <PauseCircle className="h-10 w-10" /> : <PlayCircle className="h-10 w-10 ml-1" />}
                  </button>

                  {/* Bottom controls */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/30 transition"
                      >
                        {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/30 transition"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                    </div>
                    <button
                      onClick={openModal}
                      className="flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition"
                    >
                      <PlayCircle className="h-3.5 w-3.5 text-gold-400" />
                      全屏
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    src={
                      heroVideo?.posterUrl ||
                      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20digital%20trade%20college%20campus%20building%20with%20glass%20facade%2C%20students%20collaborating%20with%20laptops%20showing%20global%20e-commerce%20data%20dashboards%2C%20professional%20atmosphere%2C%20warm%20golden%20hour%20lighting%2C%20high-end%20architectural%20photography%2C%20premium%20feel&image_size=portrait_4_3"
                    }
                    alt="中跨数字贸易产业学院"
                    width={900}
                    height={1100}
                    className="w-full h-[580px] object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />
                </>
              )}
            </div>

            {/* Floating cards */}
            <div
              className="absolute -bottom-8 -left-8 rounded-2xl bg-white p-4 shadow-2xl shadow-black/20 border border-dark-100 w-64 animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs text-dark-500">就业保障</div>
                  <div className="text-sm font-bold text-dark-900">名企直推</div>
                </div>
              </div>
              <div className="text-xs text-dark-600">与200+头部企业建立就业合作通道</div>
            </div>

            <div
              className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-2xl shadow-black/20 border border-dark-100 w-64 animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs text-dark-500">全球视野</div>
                  <div className="text-sm font-bold text-dark-900">跨境实战</div>
                </div>
              </div>
              <div className="text-xs text-dark-600">对接Amazon/eBay/TikTok等全球平台</div>
            </div>

            <div
              className="absolute top-1/2 -right-10 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 shadow-2xl shadow-primary-900/40 border border-primary-400/30 w-56 text-white animate-float"
              style={{ animationDelay: '2.5s' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-gold-300">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs text-white/70">薪资水平</div>
                  <div className="text-sm font-bold">毕业生平均起薪12K+</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <GraduationCap className="h-4 w-4 text-gold-400 shrink-0" />
                <span className="text-white/80">三年晋升管理层比率超40%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 text-xs">
          <span className="tracking-widest">SCROLL</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* 全屏视频模态框 */}
      {showModal && videoEnabled && heroVideo?.videoUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/95 backdrop-blur-md p-4 md:p-8"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              className="w-full h-full object-contain bg-black"
              src={heroVideo.videoUrl}
              poster={heroVideo.posterUrl || undefined}
              autoPlay
              controls
              playsInline
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition"
              aria-label="关闭"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-950/80 to-transparent p-6 pointer-events-none">
              <h3 className="text-white text-xl md:text-2xl font-bold">
                {heroVideo.controlPanelTitle}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                {heroVideo.controlPanelSubtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
