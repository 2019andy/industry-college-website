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

export interface SiteContent {
  siteConfig: SiteConfig;
  navigation: NavItem[];
  heroStats: HeroStat[];
  aboutHighlights: AboutHighlight[];
  programs: Program[];
  partners: Partner[];
  facultyMembers: FacultyMember[];
  newsList: NewsItem[];
  trainingBases: TrainingBase[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

// 管理后台支持管理的内容板块
export type ContentSection =
  | 'siteConfig'
  | 'navigation'
  | 'heroStats'
  | 'aboutHighlights'
  | 'programs'
  | 'partners'
  | 'facultyMembers'
  | 'newsList'
  | 'trainingBases'
  | 'contactInfo'
  | 'socialLinks';

export const ALL_SECTIONS: ContentSection[] = [
  'siteConfig',
  'navigation',
  'heroStats',
  'aboutHighlights',
  'programs',
  'partners',
  'facultyMembers',
  'newsList',
  'trainingBases',
  'contactInfo',
  'socialLinks',
];
