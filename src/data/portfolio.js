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
  name: 'Divyansh Gupta',
  roles: ['Mobile App Developer', 'AI-Augmented Developer', 'Flutter Developer'],
  badge: 'AI-augmented mobile developer', // small chip above the hero name
  tagline: 'I ship production Android & iOS apps end to end, built with an AI-augmented workflow and packed with AI-powered features.',
  location: 'Uttarakhand, India',
  email: 'gdeva368@gmail.com',
  resume: '/resume/Divyansh_Gupta_Resume.pdf',
  openToWork: false, // shows the "Open to new opportunities" badge in the hero
  bio: [
    "I'm a mobile app developer from Uttarakhand, India, with **1+ year of full-time experience** and a year of prior internships, shipping production **Android and iOS** apps end to end. **Flutter** is my primary stack, with hands-on work in **native Android (Java)** and **React Native**, so I pick the right tool for the product rather than one framework.",
    'AI runs through both how I build and what I ship. I work with an **AI-augmented workflow** (Claude Code) for scaffolding, refactoring, test generation and debugging, while owning the architecture (**Clean Architecture, MVVM**) and reviewing every change. And I ship **AI-powered features**: AI answers and mood-based verses in GitaPath, photo-based item recognition in PackSmart AI, and part identification and demand insights across a 10-app ERP.',
  ],
  facts: [
    { icon: 'mapPin', label: 'Based in', value: 'Uttarakhand, India' },
    { icon: 'cap', label: 'Education', value: 'B.Tech IT · HNB Garhwal University' },
    { icon: 'briefcase', label: 'Currently', value: 'Flutter Developer @ TechIndika' },
    { icon: 'sparkles', label: 'Builds with', value: 'AI-augmented workflow · Claude Code' },
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
    icon: 'sparkles',
    title: 'AI-Augmented Development',
    text: 'Claude Code for scaffolding, refactors, test generation and debugging, while I own the architecture and review every change.',
  },
  {
    icon: 'cpu',
    title: 'AI-Powered App Features',
    text: 'AI answers, personalised recommendations, photo-based recognition and demand insights, built into production apps.',
  },
  {
    icon: 'flutter',
    title: 'Flutter, Native Android & RN',
    text: 'Flutter first, plus native Android (Java) and React Native, on Clean Architecture and MVVM, from first screen to store release.',
  },
  {
    icon: 'zap',
    title: 'Real-time, Payments & Offline',
    text: 'Agora streaming and calls, socket chat, in-app purchases, Cashfree and Drift-powered offline sync.',
  },
];

// TODO(Divyansh): add a real "downloads / active users" figure from Play Console when you have it,
// e.g. { value: 10, suffix: 'K+', label: 'Downloads' }.
export const stats = [
  { value: 1, suffix: '+', label: 'Year full-time, plus a year of internships' },
  { value: 11, suffix: '+', label: 'Apps live on Google Play' }, // 10 Spare Parts ERP apps + GitaPath
  { value: 3, suffix: '', label: 'Products with AI features' }, // GitaPath, PackSmart AI, Spare Parts ERP
  { value: 7, suffix: '', label: 'SDKs & integrations in production' },
];

// `icon` → src/assets/tech/<icon>.svg
export const technologies = [
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Dart', icon: 'dart' },
  { name: 'Claude Code', icon: 'claude' },
  { name: 'Java', icon: 'java' },
  { name: 'Android SDK', icon: 'android' },
  { name: 'React Native', icon: 'react' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'SQLite / Drift', icon: 'sqlite' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'C', icon: 'c' },
];

// Grouped like the resume's Technical Skills. `ai: true` gets the highlighted style.
export const toolbox = [
  {
    label: 'AI-Assisted Dev',
    ai: true,
    items: [
      'Claude Code',
      'Prompt-driven code generation',
      'AI code review',
      'AI-assisted refactoring',
      'AI testing & debugging',
      'ChatGPT',
      'GitHub Copilot',
      'Gemini',
    ],
  },
  { label: 'Architecture', items: ['Clean Architecture', 'MVVM', 'Repository pattern'] },
  { label: 'State & Data', items: ['Riverpod', 'GetX', 'Drift (SQLite)', 'Offline-first sync', 'REST APIs', 'WebSockets'] },
  {
    label: 'Integrations',
    items: ['Firebase (FCM, Auth)', 'Agora RTC', 'Cashfree', 'In-App Purchases', 'MSG91', 'Google & Apple Sign-In', 'BLE'],
  },
  { label: 'Delivery', items: ['Git & GitHub', 'CodeMagic CI/CD', 'Google Play Console', 'App Store Connect'] },
];

export const experiences = [
  {
    id: 'techindika',
    company: 'TechIndika',
    url: 'https://techindika.com/',
    role: 'Junior Flutter Developer',
    type: 'Full-time',
    date: 'Aug 2025 – Present',
    current: true,
    points: [
      'Build across all my projects with an **AI-assisted workflow** (Claude Code in VS Code) for scaffolding, refactors and bug triage, cutting turnaround on features and fixes while keeping full ownership of design and code review.',
      'Shipped **AI-powered features**: AI answers, mood-based verses and insights in **GitaPath**, photo-based item recognition in **PackSmart AI**, and part identification, stock & demand insights and an AI assistant across the **Spare Parts ERP**.',
      'Shipped and maintain **multiple production mobile apps** on Google Play and the App Store, owning releases end to end with **Google, Apple & MSG91 OTP** sign-in and full **Play Store policy compliance**.',
      'Built **offline-first ERP** apps using **Drift (SQLite)** with **Riverpod** and **GetX**, with local persistence and seamless sync between offline and online states.',
      'Implemented **in-app purchases** (subscriptions, consumables, non-consumables) and integrated the **Cashfree** payment gateway.',
      'Integrated **Agora SDK** for live streaming and real-time audio/video calling, and **Firebase** for push notifications.',
      'Built **real-time chat** and socket-based features, applying async and concurrency patterns from Java/Android to **Dart streams**.',
    ],
    tags: ['Claude Code', 'AI features', 'Flutter', 'Riverpod', 'GetX', 'Drift', 'Agora', 'Firebase'],
  },
  {
    id: 'revoltronx',
    company: 'RevoltronX',
    url: 'https://www.revoltronx.com/',
    role: 'Flutter Developer Intern',
    type: 'Internship',
    date: 'Dec 2024 – Aug 2025',
    points: [
      'Developed and launched a full-featured mobile app in **Flutter** backed by **Node.js** and **MongoDB**, from UI through API integration.',
      'Implemented secure **authentication** and **Riverpod** state management for a scalable app architecture.',
      'Built **BLE / Bluetooth** communication connecting the app to the **Arvyax IoT** product.',
      'Delivered responsive, pixel-perfect UI wired to dynamic backend APIs.',
      'Used **AI coding assistants** (ChatGPT, GitHub Copilot, Claude, Gemini) throughout development.',
    ],
    tags: ['Flutter', 'Riverpod', 'Node.js', 'MongoDB', 'BLE', 'AI-assisted'],
  },
  {
    id: 'insri',
    company: 'inSri Tech Solutions',
    url: 'https://www.insri.in/',
    role: 'Android Developer Intern',
    type: 'Internship',
    date: 'Sep 2024 – Nov 2024',
    points: [
      'Built cross-platform mobile UI in **React Native** and JavaScript using modular, reusable components.',
      'Worked on native Android features with **Java** and the **Android SDK**; integrated **RESTful APIs** for real-time data updates.',
      'Used **AI coding assistants** (ChatGPT, GitHub Copilot, Claude, Gemini) throughout development.',
    ],
    tags: ['React Native', 'JavaScript', 'Java', 'Android SDK', 'AI-assisted'],
  },
];

// Real apps, all built at TechIndika with an AI-augmented workflow.
// Screenshots load from src/assets/projects/<id>/*.webp (sorted by filename).
// `captions` label each screenshot (used for multi-app ecosystems); `theme` tints the card glow;
// `aiFeatures` marks apps whose users get AI-powered features.
// TODO(Divyansh): paste Play Store URLs into `links.playStore` to show a Google Play button.
export const projects = [
  {
    id: 'gita-path',
    name: 'GitaPath',
    category: 'Lifestyle',
    company: 'TechIndika',
    aiFeatures: true,
    status: { label: 'Live on Google Play', icon: 'playStore' },
    summary:
      'An AI-powered companion for the Bhagavad Gita: ask life questions and get answers grounded in the Gita, receive verses matched to your mood, and build a daily reading habit.',
    features: [
      'AI-powered "Ask Gita": ask about anxiety, overthinking or anything else and get answers grounded in the Gita',
      'Mood-based AI verse recommendations',
      'AI insights with personalised reflections',
      'Daily verse with audio playback, favourites and sharing',
      'Every chapter with summaries and key takeaways, plus day streaks',
    ],
    tags: ['Flutter', 'AI answers', 'AI recommendations', 'Audio'],
    links: { playStore: '' },
    theme: ['#fb923c', '#fbbf24'],
  },
  {
    id: 'packsmart-ai',
    name: 'PackSmart AI',
    category: 'Productivity · Moving & storage',
    company: 'TechIndika',
    aiFeatures: true,
    summary:
      'Organise everything you pack, store or move: snap a photo and AI identifies the items, print a QR label, then scan it to see exactly what is inside.',
    features: [
      'AI identifies the items in a box from a photo',
      'Generate and print QR labels for boxes and containers',
      "Scan a code to see a container's contents instantly",
      'Organise by homes and rooms with labels, search and sorting',
      'Modes for individuals and for moving & self-storage companies',
    ],
    tags: ['Flutter', 'AI image recognition', 'QR codes'],
    links: { playStore: '' },
    theme: ['#3b82f6', '#60a5fa'],
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts ERP',
    category: 'Enterprise ERP · Mining',
    company: 'TechIndika',
    aiFeatures: true,
    status: { label: '10 apps on Google Play', icon: 'playStore' },
    summary:
      'An AI-enabled ERP ecosystem for the mining industry: 10 role-specific apps that run spare-parts operations, from the director down to the store.',
    features: [
      'AI part identification',
      'AI stock & demand insights that flag what to reorder',
      'AI search assistant for parts, requests and records in plain language',
      '10 separate apps, one per role: Director, Mechanical Manager, Supervisor, Store Manager and more',
      'Sign in with employee ID, email or mobile number',
    ],
    tags: ['Flutter', 'AI assistant', 'AI insights', 'ERP'],
    captions: ['Director · Parts Operations', 'Mechanical Manager', 'Mechanical Supervisor', 'Store Manager'],
    links: { playStore: '' },
    theme: ['#3b82f6', '#1e3a8a'],
  },
  {
    id: 'leaders-wish',
    name: "Leader's Wish",
    category: 'Enterprise ERP · Community',
    company: 'TechIndika',
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
    company: 'TechIndika',
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
