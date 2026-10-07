// Single source of truth for all site content. Edit text here only.
//
// Images are picked up automatically from src/assets (see ./assets.js), no imports needed:
//   assets/profile.(webp|png|jpg)            → About photo
//   assets/screens/*                         → 3D hero phone screens (sorted by filename)
//   assets/logos/<experience.id>.(svg|png…)  → Experience timeline logos
//   assets/projects/<project.id>/*           → Project screenshots (sorted; icon.* = app icon)
//
// `**text**` inside strings renders as highlighted text.

export const personal = {
  name: 'Divyansh',
  roles: ['Flutter Developer', 'Mobile App Engineer', 'AI-Augmented Developer'],
  tagline: 'I ship production Android & iOS apps end to end, from payments to real-time video and offline-first sync.',
  location: 'Uttarakhand, India',
  email: 'gdeva368@gmail.com',
  resume: '/resume/Divyansh_Resume.pdf',
  openToWork: false, // shows the "Open to new opportunities" badge in the hero
  bio: [
    "I'm a Flutter developer from Uttarakhand, India, with **2+ years** of experience shipping production **Android and iOS** apps end to end. At **TechIndika** I own releases on Google Play and the App Store: authentication, in-app purchases, payments, real-time video and offline-first sync.",
    'I work with an **AI-augmented workflow** (Claude Code) for scaffolding, refactoring, test generation and debugging, while owning the architecture and reviewing every change, so features move from spec to store release faster without trading off quality. My roots are in **Java and the Android SDK**, and outside of code I co-founded **Luminaries**, where I teach mathematics.',
  ],
  facts: [
    { icon: 'mapPin', label: 'Based in', value: 'Uttarakhand, India' },
    { icon: 'cap', label: 'Education', value: 'B.Tech IT · HNB Garhwal University' },
    { icon: 'briefcase', label: 'Currently', value: 'Flutter Developer @ TechIndika' },
  ],
};

export const socials = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/Cyber-Nut' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/divyanshgupta/' },
  { name: 'Email', icon: 'mail', url: `mailto:${personal.email}` },
];

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'work', title: 'Work' },
  { id: 'contact', title: 'Contact' },
];

export const services = [
  {
    icon: 'flutter',
    title: 'Flutter App Development',
    text: 'End-to-end Android & iOS apps with clean architecture, Riverpod / GetX state and pixel-perfect UI, all the way to the store release.',
  },
  {
    icon: 'zap',
    title: 'Real-time & Streaming',
    text: 'Agora live streaming and audio/video calling, socket-based chat and Firebase push notifications.',
  },
  {
    icon: 'wallet',
    title: 'Payments & Offline-first',
    text: 'Subscriptions and in-app purchases, Cashfree payments, and Drift-powered offline sync that just works.',
  },
  {
    icon: 'sparkles',
    title: 'AI-Augmented Development',
    text: 'Claude Code for scaffolding, refactors, tests and debugging, while I own the architecture and review every change.',
  },
];

// TODO(Divyansh): add a real "downloads / active users" figure from Play Console when you have it,
// e.g. { value: 10, suffix: 'K+', label: 'Downloads' }.
export const stats = [
  { value: 2, suffix: '+', label: 'Years shipping production apps' },
  { value: 3, suffix: '', label: 'Companies shipped for' },
  { value: 2, suffix: '', label: 'App stores: Google Play & App Store' },
  { value: 7, suffix: '', label: 'SDKs & integrations in production' },
];

// `icon` → src/assets/tech/<icon>.svg
export const technologies = [
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Dart', icon: 'dart' },
  { name: 'Java', icon: 'java' },
  { name: 'Android SDK', icon: 'android' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'SQLite / Drift', icon: 'sqlite' },
  { name: 'React Native', icon: 'react' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'C', icon: 'c' },
];

export const toolbox = [
  'Riverpod',
  'GetX',
  'Drift',
  'Offline-first sync',
  'WebSockets',
  'REST APIs',
  'Agora RTC',
  'Firebase FCM & Auth',
  'In-App Purchases',
  'Cashfree',
  'MSG91',
  'Google & Apple Sign-In',
  'BLE',
  'CodeMagic CI/CD',
  'Google Play Console',
  'App Store Connect',
  'Claude Code',
];

export const experiences = [
  {
    id: 'techindika',
    company: 'TechIndika',
    url: 'https://techindika.com/',
    role: 'Junior Flutter Developer',
    date: 'Aug 2025 – Present',
    current: true,
    points: [
      'Shipped and maintain **multiple production apps** on Google Play and the App Store, owning releases end to end with **Google, Apple & MSG91 OTP** sign-in and full **Play Store policy compliance**.',
      'Built **offline-first ERP** apps using **Drift (SQLite)** with **Riverpod** and **GetX**, with local persistence and seamless sync between offline and online states.',
      'Implemented **in-app purchases** (subscriptions, consumables, non-consumables) and integrated the **Cashfree** payment gateway.',
      'Integrated **Agora SDK** for live streaming and real-time audio/video calling, and **Firebase** for push notifications.',
      'Built **real-time chat** and socket-based features, applying async and concurrency patterns from Java/Android to **Dart streams**.',
      'Adopted an **AI-assisted workflow** (Claude Code in VS Code) for scaffolding, refactors and bug triage, cutting turnaround while keeping full ownership of design and code review.',
    ],
    tags: ['Flutter', 'Riverpod', 'GetX', 'Drift', 'Agora', 'Firebase', 'Claude Code'],
  },
  {
    id: 'revoltronx',
    company: 'RevoltronX',
    url: 'https://www.revoltronx.com/',
    role: 'Flutter Developer Intern',
    date: 'Dec 2024 – Aug 2025',
    points: [
      'Developed and launched a full-featured **Flutter app** backed by **Node.js** and **MongoDB**, from UI through API integration.',
      'Implemented secure **authentication** and **Riverpod** state management for a scalable app architecture.',
      'Built **BLE / Bluetooth** communication connecting the app to the **Arvyax IoT** product.',
      'Delivered responsive, pixel-perfect UI wired to dynamic backend APIs.',
    ],
    tags: ['Flutter', 'Riverpod', 'Node.js', 'MongoDB', 'BLE'],
  },
  {
    id: 'insri',
    company: 'inSri Tech Solutions',
    url: 'https://www.insri.in/',
    role: 'Android Developer Intern',
    date: 'Sep 2024 – Nov 2024',
    points: [
      'Built cross-platform mobile UI in **React Native** and JavaScript using modular, reusable components.',
      'Worked on Android features with **Java** and the **Android SDK**; integrated **RESTful APIs** for real-time data updates.',
    ],
    tags: ['React Native', 'JavaScript', 'Java', 'Android SDK'],
  },
];

// Work highlights from company apps (each maps to a resume bullet; no screenshots yet).
// TODO(Divyansh): when allowed, add screenshots to src/assets/projects/<id>/ and store links below.
// `theme` colors the placeholder art until real screenshots are added.
export const projects = [
  {
    id: 'live-streaming',
    name: 'Live Streaming & Real-time Calling',
    category: 'Real-time · Media',
    summary:
      'Live streaming and real-time audio/video calling with the Agora SDK, plus socket-based chat and Firebase push notifications in production apps.',
    role: 'Flutter Developer @ TechIndika',
    features: [
      'Agora live streaming & audio/video calling',
      'Socket-based real-time chat on Dart streams',
      'Async & concurrency patterns from Java/Android',
      'Firebase Cloud Messaging push notifications',
    ],
    tags: ['Flutter', 'Agora RTC', 'Firebase', 'WebSockets'],
    links: { playStore: '', appStore: '', github: '', video: '' },
    theme: ['#13b9fd', '#7c3aed'],
  },
  {
    id: 'payments',
    name: 'Payments, Subscriptions & Sign-in',
    category: 'Monetization · Auth',
    summary:
      'Monetization and authentication for apps live on Google Play and the App Store: in-app purchases, the Cashfree gateway and multi-provider sign-in.',
    role: 'Flutter Developer @ TechIndika',
    features: [
      'Subscriptions, consumables & non-consumables',
      'Cashfree payment gateway integration',
      'Google, Apple & MSG91 OTP sign-in',
      'Full Play Store policy compliance for releases',
    ],
    tags: ['Flutter', 'In-App Purchases', 'Cashfree', 'MSG91'],
    links: { playStore: '', appStore: '', github: '', video: '' },
    theme: ['#22c55e', '#0ea5e9'],
  },
  {
    id: 'offline-erp',
    name: 'Offline-first ERP',
    category: 'Enterprise · Offline-first',
    summary:
      'ERP apps that keep working without internet: local persistence with Drift (SQLite) and seamless sync between offline and online states.',
    role: 'Flutter Developer @ TechIndika',
    features: [
      'Drift (SQLite) local database',
      'Seamless offline ↔ online synchronisation',
      'Riverpod + GetX state management',
    ],
    tags: ['Flutter', 'Drift', 'SQLite', 'Riverpod', 'GetX'],
    links: { playStore: '', appStore: '', github: '', video: '' },
    theme: ['#5eead4', '#02569b'],
  },
  {
    id: 'arvyax',
    name: 'Arvyax IoT Companion',
    category: 'IoT · Bluetooth',
    summary:
      'A full-featured Flutter app backed by Node.js and MongoDB, with BLE / Bluetooth communication connecting it to the Arvyax IoT product.',
    role: 'Flutter Developer Intern @ RevoltronX',
    features: [
      'BLE / Bluetooth link to the Arvyax device',
      'Secure authentication + Riverpod state',
      'Node.js + MongoDB backend, UI through API',
    ],
    tags: ['Flutter', 'BLE', 'Riverpod', 'Node.js', 'MongoDB'],
    links: { playStore: '', appStore: '', github: '', video: '' },
    theme: ['#f59e0b', '#ef4444'],
  },
];
