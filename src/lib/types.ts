// ===== 内容类型定义 =====

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutHighlight {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  id: string;
  name: string;
  degree: string;
  duration: string;
  overview: string;
  curriculum: string[];
  career: string[];
  featured: boolean;
}

export interface Partner {
  id: number;
  name: string;
  category: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  education: string;
  research: string[];
  avatar: string;
}

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  featured: boolean;
}

export interface TrainingBase {
  id: number;
  name: string;
  area: string;
  seats: string;
  systems: string[];
  description: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workHours: string;
  qqGroup: string;
  wechatOfficial: string;
  coordinates: { lat: number; lng: number };
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  description: string;
  keywords: string[];
}

export interface HeroVideo {
  enabled: boolean;
  mode: 'background' | 'player';
  videoUrl: string;
  posterUrl: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
  controlPanelTitle: string;
  controlPanelSubtitle: string;
}

// ===== 页面编辑器通用组件类型 =====
// 通用：图标引用（字符串，在前端通过 iconMap 映射）
export type IconName =
  | 'Award'
  | 'Building2'
  | 'Briefcase'
  | 'Users'
  | 'Target'
  | 'Eye'
  | 'Heart'
  | 'Lightbulb'
  | 'GraduationCap'
  | 'Rocket'
  | 'Sparkles'
  | 'Trophy'
  | 'ShieldCheck'
  | 'ArrowRight'
  | 'TrendingUp'
  | 'BookOpen'
  | 'CheckCircle'
  | 'Cpu'
  | 'Globe'
  | 'Store'
  | 'Layers'
  | 'Clock'
  | 'UserCheck'
  | 'Handshake'
  | 'BriefcaseBusiness'
  | 'Network'
  | 'LineChart'
  | 'School'
  | 'MapPin'
  | 'Bus'
  | 'Car'
  | 'Train'
  | 'Phone'
  | 'Mail'
  | 'MessageCircle'
  | 'QrCode'
  | 'Headphones'
  | 'PlayCircle'
  | 'Zap'
  | 'Star'
  | 'Gift';

export interface IconCard {
  id: number;
  icon: IconName;
  label: string;
  title: string;
  description: string;
  color: string;
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: IconName;
  milestone: string;
}

export interface FeatureStep {
  id: number;
  icon: IconName;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
}

export interface StepGuide {
  id: number;
  icon: IconName;
  stepLabel: string;
  title: string;
  description: string;
}

export interface SimpleStat {
  id: number;
  icon: IconName;
  label: string;
  stat: string;
  description: string;
  color: string;
}

export interface TrafficTip {
  id: number;
  icon: IconName;
  label: string;
  content: string;
  color: string;
}

// ===== 各二级页面独立配置 =====
export interface PageBanner {
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export interface AboutPageConfig {
  banner: PageBanner;
  introTitle: string;
  introTitleHighlight: string;
  introPrimaryParagraph: string;
  introSecondaryParagraph: string;
  visionCards: IconCard[];
  timeline: TimelineItem[];
  leadershipTitle: string;
  leadershipHighlight: string;
  leadershipParagraph: string;
  leadershipMembers: Array<{
    id: number;
    name: string;
    position: string;
    tagline: string;
    description: string;
    photo?: string;
    accent: string;
  }>;
}

export interface ProgramsPageConfig {
  banner: PageBanner;
  overviewTitle: string;
  overviewHighlight: string;
  overviewParagraph: string;
  cultivationPathTitle: string;
  cultivationPathHighlight: string;
  cultivationPathParagraph: string;
  cultivationSteps: Array<{
    id: number;
    year: string;
    yearLabel: string;
    title: string;
    description: string;
    highlights: string[];
    color: string;
    icon: IconName;
  }>;
  ctaTitle: string;
  ctaHighlight: string;
  ctaParagraph: string;
}

export interface IndustryPageConfig {
  banner: PageBanner;
  projectTitle: string;
  projectHighlight: string;
  projectParagraph: string;
  projectModes: FeatureStep[];
  careerTitle: string;
  careerHighlight: string;
  careerParagraph: string;
  careerStats: SimpleStat[];
  careerSteps: StepGuide[];
}

export interface FacultyPageConfig {
  banner: PageBanner;
  teamStrengthTitle: string;
  teamStrengthHighlight: string;
  teamStrengthParagraph: string;
  teamCards: SimpleStat[];
  dualMentorTitle: string;
  dualMentorHighlight: string;
  dualMentorParagraph: string;
  academicMentor: {
    title: string;
    subtitle: string;
    description: string;
    items: string[];
  };
  industryMentor: {
    title: string;
    subtitle: string;
    description: string;
    items: string[];
  };
  recruitmentTitle: string;
  recruitmentHighlight: string;
  recruitmentParagraph: string;
}

export interface NewsPageConfig {
  banner: PageBanner;
  listTitle: string;
  listHighlight: string;
  listParagraph: string;
  categories: string[];
}

export interface ContactPageConfig {
  banner: PageBanner;
  infoTitle: string;
  infoHighlight: string;
  infoParagraph: string;
  formTitle: string;
  formHighlight: string;
  formParagraph: string;
  formSuccessText: string;
  mapTitle: string;
  mapSubtitle: string;
  trafficTips: TrafficTip[];
  hotlineTitle: string;
  hotlinePhone: string;
  hotlineHours: string;
  hotlineParagraph: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  navigation: NavItem[];
  heroStats: HeroStat[];
  heroVideo: HeroVideo;
  aboutHighlights: AboutHighlight[];
  programs: Program[];
  partners: Partner[];
  facultyMembers: FacultyMember[];
  newsList: NewsItem[];
  trainingBases: TrainingBase[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  aboutPage: AboutPageConfig;
  programsPage: ProgramsPageConfig;
  industryPage: IndustryPageConfig;
  facultyPage: FacultyPageConfig;
  newsPage: NewsPageConfig;
  contactPage: ContactPageConfig;
}

// 管理后台支持管理的内容板块
export type ContentSection =
  | 'siteConfig'
  | 'navigation'
  | 'heroStats'
  | 'heroVideo'
  | 'aboutHighlights'
  | 'programs'
  | 'partners'
  | 'facultyMembers'
  | 'newsList'
  | 'trainingBases'
  | 'contactInfo'
  | 'socialLinks'
  | 'aboutPage'
  | 'programsPage'
  | 'industryPage'
  | 'facultyPage'
  | 'newsPage'
  | 'contactPage';

export const ALL_SECTIONS: ContentSection[] = [
  'siteConfig',
  'navigation',
  'heroStats',
  'heroVideo',
  'aboutHighlights',
  'programs',
  'partners',
  'facultyMembers',
  'newsList',
  'trainingBases',
  'contactInfo',
  'socialLinks',
  'aboutPage',
  'programsPage',
  'industryPage',
  'facultyPage',
  'newsPage',
  'contactPage',
];

// 页面编辑器对应的中文名称（后台菜单分组使用）
export const PAGE_EDITOR_META: Record<
  'aboutPage' | 'programsPage' | 'industryPage' | 'facultyPage' | 'newsPage' | 'contactPage',
  { name: string; path: string; icon: string }
> = {
  aboutPage: { name: '学院概况页', path: '/admin/page-editor/about', icon: 'Building2' },
  programsPage: { name: '专业设置页', path: '/admin/page-editor/programs', icon: 'GraduationCap' },
  industryPage: { name: '产教融合页', path: '/admin/page-editor/industry', icon: 'Handshake' },
  facultyPage: { name: '师资力量页', path: '/admin/page-editor/faculty', icon: 'Users' },
  newsPage: { name: '新闻动态页', path: '/admin/page-editor/news', icon: 'Newspaper' },
  contactPage: { name: '联系我们页', path: '/admin/page-editor/contact', icon: 'Phone' },
};
