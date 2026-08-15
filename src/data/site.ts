export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  { label: '首页', href: '/' },
  {
    label: '学院概况',
    href: '/about',
    children: [
      { label: '学院简介', href: '/about#intro' },
      { label: '组织架构', href: '/about#organization' },
      { label: '领导团队', href: '/about#leadership' },
      { label: '发展历程', href: '/about#history' },
    ],
  },
  {
    label: '专业设置',
    href: '/programs',
    children: [
      { label: '跨境电子商务', href: '/programs#cross-border' },
      { label: '国际商务', href: '/programs#international' },
      { label: '数字营销', href: '/programs#marketing' },
      { label: '供应链管理', href: '/programs#supply' },
    ],
  },
  {
    label: '产教融合',
    href: '/industry',
    children: [
      { label: '合作企业', href: '/industry#partners' },
      { label: '实训基地', href: '/industry#training' },
      { label: '校企项目', href: '/industry#projects' },
      { label: '就业服务', href: '/industry#careers' },
    ],
  },
  { label: '师资力量', href: '/faculty' },
  { label: '新闻动态', href: '/news' },
  { label: '联系我们', href: '/contact' },
];

export const heroStats = [
  { value: 12, suffix: '+', label: '年办学积淀' },
  { value: 50000, suffix: '+', label: '培养学子' },
  { value: 200, suffix: '+', label: '合作企业' },
  { value: 98, suffix: '%', label: '就业率' },
];

export const aboutHighlights = [
  {
    id: 1,
    title: '国家政策导向',
    description: '深入贯彻国家产教融合战略，服务数字贸易强国建设，推动教育链、人才链与产业链、创新链有机衔接。',
    icon: 'Award',
  },
  {
    id: 2,
    title: '产业学院模式',
    description: '由高校与中跨集团深度共建，校企双主体协同育人，实现专业设置与产业需求同频共振。',
    icon: 'Building2',
  },
  {
    id: 3,
    title: '真实项目驱动',
    description: '引入跨境电商真实业务场景，以项目制教学贯穿培养过程，学生在校即积累实战经验。',
    icon: 'Briefcase',
  },
  {
    id: 4,
    title: '双师型师资',
    description: '高校学术导师与企业资深专家联合授课，理论高度与实践深度兼备，确保教学内容与时俱进。',
    icon: 'Users',
  },
];

export const programs = [
  {
    id: 'cross-border',
    name: '跨境电子商务',
    degree: '本科 / 专科',
    duration: '4年 / 3年',
    overview: '面向数字贸易全球化趋势，培养掌握跨境电商全链路运营的复合型高级人才。',
    curriculum: ['国际贸易实务', '跨境电商平台运营', '海外社交媒体营销', '国际物流与供应链', '跨境支付与结算', '小语种商务沟通'],
    career: ['跨境电商运营总监', '独立站站长', 'Amazon/eBay大卖家', '跨境供应链经理'],
    featured: true,
  },
  {
    id: 'international',
    name: '国际商务（数字贸易方向）',
    degree: '本科',
    duration: '4年',
    overview: '融合国际商务规则与数字贸易新业态，培养具备全球视野的国际化商务精英。',
    curriculum: ['国际贸易理论与政策', '数字贸易规则', '国际市场营销', '跨国商务谈判', '国际商法', '全球化运营管理'],
    career: ['国际商务经理', '外贸业务主管', '跨境B2B销售总监', '海外市场拓展经理'],
    featured: false,
  },
  {
    id: 'marketing',
    name: '数字营销（跨境方向）',
    degree: '本科 / 专科',
    duration: '4年 / 3年',
    overview: '聚焦海外数字营销生态，精通Google/Facebook/TikTok等海外主流平台营销玩法。',
    curriculum: ['数字营销战略', 'SEO/SEM优化', '海外社媒运营', '信息流广告投放', '品牌出海策划', '数据分析与归因'],
    career: ['海外数字营销总监', '独立站增长黑客', '社媒运营负责人', '投放优化专家'],
    featured: true,
  },
  {
    id: 'supply',
    name: '供应链管理（国际物流）',
    degree: '本科 / 专科',
    duration: '4年 / 3年',
    overview: '对接国际物流与跨境供应链需求，打造具备全球供应链运筹能力的专业管理人才。',
    curriculum: ['供应链管理原理', '国际物流与仓储', '跨境选品与采购', '库存优化管理', 'ERP系统操作', '海外仓运营'],
    career: ['供应链总监', '海外仓运营经理', '国际物流主管', '采购经理'],
    featured: false,
  },
];

export const partners = [
  { id: 1, name: '阿里巴巴国际站', category: '跨境平台' },
  { id: 2, name: 'Amazon全球开店', category: '跨境平台' },
  { id: 3, name: 'eBay跨境电商', category: '跨境平台' },
  { id: 4, name: 'TikTok Shop', category: '社交电商' },
  { id: 5, name: 'Google出海', category: '数字营销' },
  { id: 6, name: 'Meta海外营销', category: '数字营销' },
  { id: 7, name: 'Shopify独立站', category: '独立站' },
  { id: 8, name: '菜鸟国际物流', category: '物流仓储' },
  { id: 9, name: '递四方速递', category: '物流仓储' },
  { id: 10, name: '连连跨境支付', category: '跨境支付' },
  { id: 11, name: 'PayPal中国', category: '跨境支付' },
  { id: 12, name: '中跨集团', category: '产业运营' },
];

export const facultyMembers = [
  {
    id: 1,
    name: '张明远',
    title: '院长 / 教授',
    bio: '博士生导师，数字贸易领域权威专家，国家跨境电商综试区专家委员会委员，主持国家级课题10余项。',
    education: '复旦大学经济学博士',
    research: ['数字贸易理论', '跨境电商政策', '产业经济'],
    avatar: '',
  },
  {
    id: 2,
    name: '李文华',
    title: '副院长 / 副教授',
    bio: '前Amazon华南区高级运营总监，15年跨境电商实战经验，操盘年销售额10亿+项目。',
    education: '中山大学MBA',
    research: ['跨境平台运营', '品牌出海', '供应链管理'],
    avatar: '',
  },
  {
    id: 3,
    name: '王建国',
    title: '产业教授',
    bio: '中跨集团联合创始人、CEO，广东省跨境电商协会副会长，深耕外贸行业20余年。',
    education: '浙江大学EMBA',
    research: ['外贸转型', '企业战略', '产教融合'],
    avatar: '',
  },
  {
    id: 4,
    name: '陈美琳',
    title: '专业带头人 / 高级经济师',
    bio: '前阿里巴巴国际站金牌讲师，10年B2B跨境营销经验，服务外贸企业超500家。',
    education: '广东外语外贸大学硕士',
    research: ['国际营销', 'B2B跨境', '客户开发'],
    avatar: '',
  },
];

export const newsList = [
  {
    id: 1,
    category: '学院要闻',
    title: '中跨数字贸易产业学院揭牌仪式隆重举行',
    date: '2026-06-18',
    summary: '学院与中跨集团深度共建的产业学院正式揭牌，标志着产教融合迈上新台阶，省教育厅、市商务局领导出席活动。',
    image: '',
    featured: true,
  },
  {
    id: 2,
    category: '校企合作',
    title: '我院与Amazon全球开店达成战略合作',
    date: '2026-06-05',
    summary: 'Amazon将在我院设立跨境电商人才培养基地，共建实训课程，联合培养亚马逊运营专才。',
    image: '',
    featured: true,
  },
  {
    id: 3,
    category: '学生成果',
    title: '学子斩获全国跨境电商创新创业大赛一等奖',
    date: '2026-05-28',
    summary: '我院学子在第五届全国跨境电商创新创业大赛中脱颖而出，以创新商业模式和出色的运营数据斩获桂冠。',
    image: '',
    featured: false,
  },
  {
    id: 4,
    category: '学术动态',
    title: '《中国数字贸易发展蓝皮书》编写工作启动',
    date: '2026-05-10',
    summary: '我院作为主编单位受邀参与行业蓝皮书编写工作，张明远院长担任编委会副主任。',
    image: '',
    featured: false,
  },
];

export const trainingBases = [
  {
    id: 1,
    name: '跨境电商综合实训中心',
    area: '3000㎡',
    seats: '200+工位',
    systems: ['亚马逊/速卖通真实店铺', '独立站建站系统', 'ERP管理系统', '数据化运营大屏'],
    description: '国内领先的沉浸式跨境电商实训环境，对接真实业务账号，实现"上学即上岗"。',
  },
  {
    id: 2,
    name: '海外数字营销实验室',
    area: '1500㎡',
    seats: '120+工位',
    systems: ['Google Ads投放平台', 'Meta商务管理平台', 'TikTok Shop后台', '数据分析看板'],
    description: '配备海外主流营销平台企业级账号，掌握千万元级广告投放方法论。',
  },
  {
    id: 3,
    name: '国际物流与供应链仿真实训室',
    area: '2000㎡',
    seats: '100+工位',
    systems: ['WMS仓储管理系统', 'TMS运输管理系统', '海外仓运营仿真', '智能分拣设备'],
    description: '复刻跨境物流全链路场景，从选品采购到海外仓尾程派送全程实操。',
  },
];

export const contactInfo = {
  address: '广东省广州市番禺区大学城外环西路',
  phone: '020-8888-8888',
  email: 'admission@zhongkuan.edu.cn',
  workHours: '周一至周五 09:00 - 18:00',
  qqGroup: '123456789',
  wechatOfficial: '中跨数贸学院',
  coordinates: { lat: 23.0393, lng: 113.3876 },
};

export const socialLinks = [
  { name: '微信公众号', icon: 'MessageCircle', href: '#' },
  { name: '官方微博', icon: 'Twitter', href: '#' },
  { name: '抖音号', icon: 'Music', href: '#' },
  { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
];
