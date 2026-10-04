// ═══════════════════════════════════════════════════════════════
//  SITE CONTENT — single source of truth.
//  Everything shown on the site is written here. Edit this file,
//  not the components.
// ═══════════════════════════════════════════════════════════════

import {
  SiCplusplus, SiC, SiJavascript, SiTypescript, SiPython,
  SiNodedotjs, SiExpress, SiFastapi, SiJsonwebtokens, SiAuth0,
  SiMongodb, SiMysql, SiJest, SiPostman,
  SiReact, SiNextdotjs, SiTailwindcss, SiRedux, SiDaisyui,
  SiGit, SiGithub, SiBitbucket, SiJira, SiVercel, SiDocker,
  SiCodeforces, SiLeetcode, SiCodechef,
} from "react-icons/si";
import { FaAws, FaLinkedin } from "react-icons/fa6";
import {
  TbBrandAws, TbCloudComputing, TbDatabase, TbServerBolt, TbApi,
  TbBinaryTree, TbCpu, TbNetwork, TbShieldLock, TbTestPipe, TbTerminal2,
} from "react-icons/tb";

// ─────────────────────────────────────────────────────────────
//  IDENTITY
// ─────────────────────────────────────────────────────────────
export const PERSON = {
  firstName: "Saubhagya",
  fullName:  "Saubhagya Laxman Mamgain",
  role:      "Backend & Full-Stack Engineer",
  shortRole: "Backend Engineer",
  location:  "Bangalore, India",
  email:     "saubhagyamamgain@gmail.com",
  phone:     "+91 94109 56469",
  phoneRaw:  "919410956469",       // used for WhatsApp links
  school:    "IIT Patna",
  degree:    "B.Tech, Electrical & Electronics Engineering",
  years:     "2023 - 2027",
  initials:  "SM",
};

// ─────────────────────────────────────────────────────────────
//  SOCIAL / PROFILE LINKS
//  >>> REPLACE THE PLACEHOLDERS BELOW WITH YOUR REAL URLS <<<
//  Any URL still containing "YOUR-" is treated as "not set yet"
//  and is hidden from the UI instead of rendering a dead link.
// ─────────────────────────────────────────────────────────────
export const SOCIALS = {
  github:     "https://github.com/YOUR-GITHUB-USERNAME",
  linkedin:   "https://linkedin.com/in/YOUR-LINKEDIN-HANDLE",
  codeforces: "https://codeforces.com/profile/YOUR-CF-HANDLE",
  leetcode:   "https://leetcode.com/u/YOUR-LEETCODE-HANDLE",
  codechef:   "https://codechef.com/users/YOUR-CODECHEF-HANDLE",
};

export const PLACEHOLDER_MARKER = "YOUR-";
export const isLive = (url) => Boolean(url) && !url.includes(PLACEHOLDER_MARKER);

export const SOCIAL_LINKS = [
  { key: "github",     label: "GitHub",     url: SOCIALS.github,     icon: SiGithub },
  { key: "linkedin",   label: "LinkedIn",   url: SOCIALS.linkedin,   icon: FaLinkedin },
  { key: "codeforces", label: "Codeforces", url: SOCIALS.codeforces, icon: SiCodeforces },
  { key: "leetcode",   label: "LeetCode",   url: SOCIALS.leetcode,   icon: SiLeetcode },
  { key: "codechef",   label: "CodeChef",   url: SOCIALS.codechef,   icon: SiCodechef },
].filter((s) => isLive(s.url));

// ─────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────
export const HERO = {
  greeting: "Hey, I am",
  name: "Saubhagya.",
  // *word* renders as highlighted serif italic
  lines: [
    "I build *backends* that hold up under real traffic - subscription systems, *serverless APIs*, and data models that stay fast when the data stops being small.",
    "Final year *Electrical & Electronics* at *IIT Patna*. Currently a backend intern at *Fourth Frontier*, shipping *AWS Lambda* services, *event-driven* integrations, and APIs other teams depend on.",
    "*600+* DSA problems solved. *Codeforces Specialist*. *1st Runner-Up* at the Pocket FM AI Creator Hackathon. I like problems where the naive answer is too slow.",
  ],
  scrollHint: "Scroll",
};

// Numbers shown as a strip under the hero.
export const STATS = [
  { value: "600+",  label: "DSA problems solved" },
  { value: "1495",  label: "Codeforces peak" },
  { value: "2",     label: "Engineering internships" },
];

// ─────────────────────────────────────────────────────────────
//  ABOUT
// ─────────────────────────────────────────────────────────────
export const ABOUT = {
  label: "About Me",
  heading: { line1: "A bit", line2: "about", line3: "me." },
  // Kept short deliberately: the Fourth Frontier/Tradylytics/LTTB detail
  // that used to live here now lives in the Experience section instead,
  // so this stays two paragraphs rather than repeating it.
  bio: [
    "I am a final-year *Electrical & Electronics Engineering* undergraduate at the *Indian Institute of Technology, Patna*, and I spend most of my time on the server side of things - designing APIs, modelling data, and making slow systems fast.",
    "I care about systems that are *correct first and fast second*, code the next person can read, and the kind of debugging that ends in understanding rather than a lucky guess.",
  ],
  resumeUrl: "/resume.pdf",

  // Portrait: drop an image at public/photo/portrait.webp, then flip
  // hasPortrait to true. Left false, the About page shows a designed
  // monogram placeholder instead of requesting an image that is not there.
  portrait: "/photo/portrait.webp",
  hasPortrait: false,
};

// ─────────────────────────────────────────────────────────────
//  EXPERIENCE
// ─────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: "Fourth Frontier Technologies",
    role: "Backend Software Developer Intern",
    period: "May 2026 - Present",
    location: "Bangalore - On-site",
    current: true,
    points: [
      "Engineered an end-to-end, multi-platform subscription management system handling cross-platform purchases via Shopify Webhooks and Android In-App APIs, with dynamic data-mapping logic and custom validation middleware classifying users across a 4-tier model.",
      "Refactored workout storage for 20 physiological metrics per timestamp, reducing 20 database records to 1 per timestamp, and architected versioned serverless APIs on AWS Lambda with a 2-tier fallback and Amazon S3 integration.",
      "Eliminated UI lag in acceleration graphs with the Largest Triangle Three Buckets algorithm - 86K data points reduced to 2K with visual fidelity preserved.",
      "Diagnosed production issues across AWS Lambda workflows using Postman, Jest/Supertest and CloudWatch log analysis.",
    ],
    stack: ["Node.js", "AWS Lambda", "Amazon S3", "CloudWatch", "Shopify Webhooks", "Jest"],
  },
  {
    company: "Tradylytics",
    role: "Full Stack Developer Intern",
    period: "May 2025 - July 2025",
    location: "Remote - IIT Patna-backed startup",
    current: false,
    points: [
      "Integrated secure authentication using JWT and Google OAuth 2.0, simplifying sign-in while strengthening account security.",
      "Constructed REST APIs for CSV trade ingestion, manual trade management and broker integrations with request validation and MongoDB persistence on an MVC architecture.",
      "Reduced API response time by removing redundant MongoDB queries, applying field projection and indexing frequently accessed collections.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "OAuth 2.0"],
  },
  {
    company: "WorldQuant Brain",
    role: "Research Consultant",
    period: "Ongoing",
    location: "Remote",
    current: false,
    points: [
      "Built alphas using quantitative finance strategies and statistical research techniques on the WorldQuant BRAIN platform.",
      "Reached Gold tier as a Research Consultant based on alpha performance and submission quality.",
    ],
    stack: ["Quantitative Finance", "Alpha Research", "WorldQuant BRAIN"],
  },
];

export const EDUCATION = [
  { degree: "B.Tech, Electrical & Electronics Engineering", org: "Indian Institute of Technology, Patna", period: "2023 - 2027", score: "77.5%" },
  { degree: "Intermediate (CBSE)", org: "Doon International School, Dehradun", period: "2023", score: "91.8%" },
  { degree: "Matriculation (ICSE)", org: "Summer Valley School, Dehradun", period: "2021", score: "97.6%" },
];

// ─────────────────────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "ai-creator-copilot",
    num: "01",
    title: "AI Creator Copilot",
    subtitle: "Pocket FM Hackathon - 1st Runner-Up",
    category: "AI / Backend",
    award: "1st Runner-Up - 1.5L prize",
    description:
      "An end-to-end AI Creator Studio that turns a story idea into a finished audio episode through a human-in-the-loop workflow - creators review, edit and regenerate every AI output before the pipeline moves on.",
    points: [
      "Interrupt-driven LangGraph pipeline that lets creators edit and regenerate at every stage while preserving workflow state across server restarts.",
      "Parallel TTS rendering with worker-based audio generation, API-key-aware rate limiting and content caching.",
      "React creator studio with a multi-step workflow, real-time generation progress and stage-wise approve/edit/regenerate controls.",
    ],
    tech: ["FastAPI", "LangGraph", "Google Gemini", "React.js", "Zustand", "Tailwind CSS"],
    repo: null,   // add your GitHub URL here
    live: null,
  },
  {
    id: "streamify",
    num: "02",
    title: "Streamify",
    subtitle: "Language Learning Platform",
    category: "Full Stack",
    award: null,
    description:
      "A full-stack language exchange platform with instant messaging and HD video communication, built so learners can find partners and actually talk to them.",
    points: [
      "Social layer with friend connections, activity feeds and private messaging.",
      "GetStream APIs integrated for video calling, screen sharing, cloud recording and scalable live communication.",
      "Responsive multi-theme interface built from modular DaisyUI components.",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "DaisyUI", "Stream APIs"],
    repo: null,
    live: null,
  },
  {
    id: "hosca",
    num: "03",
    title: "HOSCA",
    subtitle: "IIT Patna Cultural Club Portal",
    category: "Production - Next.js",
    award: "500+ users",
    description:
      "A production web portal for the IIT Patna cultural club that carried 500+ users through major campus events and registrations.",
    points: [
      "Led end-to-end development, from architecture through deployment.",
      "Server-side rendering and SEO optimisation in Next.js for discoverability and page performance.",
      "Deployed on Vercel for reliable availability during high-traffic campus events.",
    ],
    tech: ["TypeScript", "Next.js", "React.js", "Vercel"],
    repo: null,
    live: null,
  },
];

// ─────────────────────────────────────────────────────────────
//  ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { value: "1st",    label: "Runner-Up, Pocket FM AI Creator Hackathon", note: "36-hour national hackathon - 1.5 lakh prize" },
  { value: "Top 1%", label: "Flipkart GRID 8.0 Semi-Finalist",           note: "out of 1,65,730 participants" },
  { value: "1495",   label: "Codeforces peak rating - Specialist",       note: "CodeChef 3-star coder" },
  { value: "#112",   label: "CodeChef Starters 172",                     note: "among 35,000+ participants" },
  { value: "600+",   label: "DSA problems solved",                       note: "LeetCode - Codeforces - GeeksforGeeks" },
  { value: "0.4%",   label: "JEE Mains top percentile",                  note: "AIR 6102 in JEE Advanced among 190K" },
];

// ─────────────────────────────────────────────────────────────
//  POSITIONS OF RESPONSIBILITY
// ─────────────────────────────────────────────────────────────
export const POSITIONS = [
  { role: "TPC Placement Coordinator",       org: "IIT Patna",    note: "Coordinate outreach and placement processes with recruiting companies." },
  { role: "Web Dev Coordinator",             org: "HOSCA",        note: "Leading the web development vertical of the IIT Patna cultural club." },
  { role: "Planning and Curation Coordinator", org: "TEDxIITPatna", note: "2025-26, Sub Coordinator 2024-25." },
];

// ─────────────────────────────────────────────────────────────
//  SKILLS
// ─────────────────────────────────────────────────────────────
export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: [
      { name: "C++",        icon: SiCplusplus },
      { name: "C",          icon: SiC },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python",     icon: SiPython },
      { name: "SQL",        icon: TbDatabase },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js",    icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "FastAPI",    icon: SiFastapi },
      { name: "REST APIs",  icon: TbApi },
      { name: "JWT",        icon: SiJsonwebtokens },
      { name: "OAuth 2.0",  icon: SiAuth0 },
    ],
  },
  {
    title: "Cloud",
    items: [
      { name: "AWS Lambda", icon: FaAws },
      { name: "Amazon S3",  icon: TbCloudComputing },
      { name: "Amazon RDS", icon: TbDatabase },
      { name: "DynamoDB",   icon: TbServerBolt },
      { name: "CloudWatch", icon: TbBrandAws },
    ],
  },
  {
    title: "Databases & Testing",
    items: [
      { name: "MongoDB",   icon: SiMongodb },
      { name: "MySQL",     icon: SiMysql },
      { name: "Jest",      icon: SiJest },
      { name: "Supertest", icon: TbTestPipe },
      { name: "Postman",   icon: SiPostman },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js",      icon: SiReact },
      { name: "Next.js",       icon: SiNextdotjs },
      { name: "Tailwind CSS",  icon: SiTailwindcss },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "DaisyUI",       icon: SiDaisyui },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git",       icon: SiGit },
      { name: "GitHub",    icon: SiGithub },
      { name: "Bitbucket", icon: SiBitbucket },
      { name: "Jira",      icon: SiJira },
      { name: "Docker",    icon: SiDocker },
      { name: "Vercel",    icon: SiVercel },
      { name: "VS Code",   icon: TbTerminal2 },
    ],
  },
];

export const FUNDAMENTALS = [
  { name: "Data Structures & Algorithms", icon: TbBinaryTree },
  { name: "Object-Oriented Programming",  icon: TbCpu },
  { name: "Operating Systems",            icon: TbTerminal2 },
  { name: "Computer Networks",            icon: TbNetwork },
  { name: "System Design",                icon: TbServerBolt },
  { name: "Secure Auth",                  icon: TbShieldLock },
];

// Flat list, used by the compact skill marquees.
export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);

// Curated subset shown as tags under "Where I'm useful" — the stack a
// visitor actually cares about at a glance, not the full resume list.
const FEATURED_SKILL_NAMES = [
  "React.js", "Next.js", "Node.js", "Express.js", "AWS Lambda",
  "MongoDB", "MySQL", "TypeScript", "Python", "C++", "Tailwind CSS", "Docker",
];
export const FEATURED_SKILLS = ALL_SKILLS.filter((s) => FEATURED_SKILL_NAMES.includes(s.name));

// ─────────────────────────────────────────────────────────────
//  CONTACT
// ─────────────────────────────────────────────────────────────
export const CONTACT = {
  label: "Get In Touch",
  heading: { line1: "Let's", line2: "build", line3: "something." },
  blurb:
    "Open to backend and full-stack roles, internships, and interesting problems. The fastest way to reach me is email - I reply within a day.",
};

export const COUNTRIES = [
  { code: "91",  name: "India",        flag: "🇮🇳" },
  { code: "1",   name: "US / Canada",  flag: "🇺🇸" },
  { code: "44",  name: "UK",           flag: "🇬🇧" },
  { code: "971", name: "UAE",          flag: "🇦🇪" },
  { code: "65",  name: "Singapore",    flag: "🇸🇬" },
  { code: "61",  name: "Australia",    flag: "🇦🇺" },
  { code: "49",  name: "Germany",      flag: "🇩🇪" },
  { code: "33",  name: "France",       flag: "🇫🇷" },
  { code: "81",  name: "Japan",        flag: "🇯🇵" },
  { code: "82",  name: "South Korea",  flag: "🇰🇷" },
  { code: "31",  name: "Netherlands",  flag: "🇳🇱" },
  { code: "41",  name: "Switzerland",  flag: "🇨🇭" },
];
