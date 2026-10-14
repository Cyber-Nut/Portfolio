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
  { value: 11, suffix: '+', label: 'Apps live on Google Play' }, // 10 Spare Parts ERP apps + GitaPath
  { value: 3, suffix: '', label: 'Companies shipped for' },
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

// Real apps. Screenshots load from src/assets/projects/<id>/*.webp (sorted by filename).
// `captions` label each screenshot (used for multi-app ecosystems); `theme` tints the card glow.
// TODO(Divyansh): paste Play Store URLs into `links.playStore` to show a Google Play button.
export const projects = [
  {
    id: 'gita-path',
    name: 'GitaPath',
    category: 'Lifestyle',
    status: { label: 'Live on Google Play', icon: 'playStore' },
    summary:
      'A daily companion for the Bhagavad Gita: read every chapter, listen to verses, check in with your mood and build a reading habit.',
    features: [
      'Daily verse with audio playback, favourites and sharing',
      'Mood check-in that suggests a personalised verse',
      '"Ask Gita": pick a topic like Anxiety & Overthinking or ask your own question',
      'Every chapter with summaries and key takeaways, searchable by verse',
      'Day streaks and stats to build the habit',
    ],
    tags: ['Flutter', 'Audio', 'Google & phone sign-in'],
    links: { playStore: '' },
    theme: ['#fb923c', '#fbbf24'],
  },
  {
    id: 'packsmart-ai',
    name: 'PackSmart AI',
    category: 'Productivity · Moving & storage',
    summary:
      'Organise everything you pack, store or move: print QR labels for your containers, then scan one to see exactly what is inside.',
    features: [
      'Generate and print QR labels for boxes and containers',
      "Scan a code to see a container's contents instantly",
      'Organise by homes and rooms with labels, search and sorting',
      'Modes for individuals and for moving & self-storage companies',
    ],
    tags: ['Flutter', 'QR codes', 'Scanning'],
    links: { playStore: '' },
    theme: ['#3b82f6', '#60a5fa'],
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts ERP',
    category: 'Enterprise ERP · Mining',
    status: { label: '10 apps on Google Play', icon: 'playStore' },
    summary:
      'An ERP ecosystem for the mining industry: 10 role-specific apps that run spare-parts operations, from the director down to the store.',
    features: [
      '10 separate apps, one for each role in the operation',
      'Director, Mechanical Manager, Mechanical Supervisor, Store Manager and more',
      'Sign in with employee ID, email or mobile number',
    ],
    tags: ['Flutter', 'ERP', 'Role-based apps'],
    captions: ['Director · Parts Operations', 'Mechanical Manager', 'Mechanical Supervisor', 'Store Manager'],
    links: { playStore: '' },
    theme: ['#3b82f6', '#1e3a8a'],
  },
  {
    id: 'leaders-wish',
    name: "Leader's Wish",
    category: 'Enterprise ERP · Community',
    status: { label: '3-app ecosystem', icon: 'smartphone' },
    summary: 'A 3-app ERP ecosystem to manage a social circle and distribute goodies within it.',
    features: [
      "The Leader's Wish app plus dedicated Assembly and District Coordinator apps",
      'Manage the members of a social circle',
      'Organise goodies distribution across the circle',
    ],
    tags: ['Flutter', 'ERP', 'Role-based apps'],
    captions: ["Leader's Wish", 'Assembly Coordinator', 'District Coordinator'],
    links: { playStore: '' },
    theme: ['#6366f1', '#8b5cf6'],
  },
  {
    id: 'live-connect',
    name: 'Live Connect',
    category: 'Customer support',
    status: { label: 'Internal tool', icon: 'briefcase' },
    summary:
      'A support-chat app for agents that can be connected to any app, so a team answers its users from one agent workspace.',
    features: [
      'Agent workspace with secure sign-in',
      'Real-time chat between support agents and users',
      'Connects to any app as its support channel',
    ],
    tags: ['Flutter', 'Real-time chat'],
    links: { playStore: '' },
    theme: ['#f43f5e', '#f97316'],
  },
];
