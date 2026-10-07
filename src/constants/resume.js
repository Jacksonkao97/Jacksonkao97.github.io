// Single source for the /resume page and the generated Resume.pdf
// (scripts/resume/build-pdf.js). Edit here; never edit the PDF by hand.
export const personalInfo = {
  name: "Yee Tsung (Jackson) Kao",
  title: "Full Stack Developer",
  email: "jacksonkao97@gmail.com",
  phone: "+6011-6141-6637",
  location: "Kuala Lumpur, Malaysia",
  github: "https://github.com/jacksonkao97",
  linkedin: "https://www.linkedin.com/in/jackson-kao-654bab1b4",
};

export const summary =
  "Full Stack Developer with 2+ years of experience shipping high-performance, AI-accelerated web applications for global brands. Known for rapid delivery under tight campaign deadlines and the ability to manage multiple concurrent projects, using Claude Code as a core workflow tool. Strong cross-cloud background across AWS, GCP, and Firebase, with a track record of end-to-end ownership from feature development through production support.";

// Each point mirrors public/docs/Resume.md: `lead` is the bolded opening.
export const experiences = [
  {
    company: "CONTEN.T | Digital Agency",
    role: "Full Stack Developer",
    period: "Jul 2024 – Present",
    location: "Kuala Lumpur, Malaysia",
    description: [
      {
        lead: "Delivered global luxury brand campaign websites",
        text: "under compressed, fast-turnaround timelines, often managing multiple concurrent projects without missing launch dates.",
      },
      {
        lead: "Used Claude Code as a core development workflow,",
        text: "running multiple projects in parallel with AI-assisted multi-tasking to hit tight campaign deadlines; used Gemini API for AI image/video generation and real-time detection features.",
      },
      {
        lead: "Owned the agency's internal CRM dashboard product",
        text: "end-to-end, shipping new features and updates on a fast release cadence and resolving production bugs with quick-turnaround hotfixes.",
      },
      {
        lead: "Built cross-cloud backend services",
        text: "on AWS (Amplify, EventBridge, Route 53, S3, Lambda), GCP (BigQuery, Cloud Functions, IAM), and Firebase (Firestore, Storage, Authentication) to support campaign and product delivery.",
      },
      {
        lead: "Extended web experiences into APAC messaging channels",
        text: "by integrating LINE and KakaoTalk SDKs.",
      },
      {
        lead: "Partnered directly with UX/UI and brand teams",
        text: "to align interactivity, functionality, and stability, translating creative concepts into production-ready React/Next.js builds.",
      },
    ],
  },
  {
    company: "CareMate Health",
    role: "Software Developer",
    period: "Jan 2024 – Apr 2024",
    location: "Winnipeg, MB, Canada",
    description: [
      {
        lead: "Built and maintained production RESTful APIs",
        text: "with Node.js/Express.js backed by PostgreSQL and AWS S3, supporting full CRUD data operations.",
      },
      {
        lead: "Deployed and monitored backend infrastructure",
        text: "on AWS Elastic Beanstalk with CloudWatch, and hardened auth/request validation using API Gateway and Lambda.",
      },
    ],
  },
];

export const skills = [
  { category: "Languages", items: "JavaScript, TypeScript, Python" },
  {
    category: "Frameworks",
    items: "React, Next.js, Express.js, Tailwind CSS, Zustand, Phaser.js",
  },
  { category: "UI Libraries", items: "shadcn/ui, Ant Design" },
  {
    category: "Cloud & DevOps",
    items:
      "AWS (Amplify, EventBridge, Route 53, S3, Lambda, EC2, CloudWatch, Elastic Beanstalk), GCP (BigQuery, Cloud Functions, IAM), Firebase (Functions, Auth, Firestore, Storage)",
  },
  { category: "Databases", items: "PostgreSQL, Firestore, BigQuery" },
  {
    category: "AI Integration & Tooling",
    items:
      "Claude Code (daily, multi-project workflow), Google Gemini API (image/video generation, real-time detection), OpenAI API",
  },
  { category: "Design & Collaboration", items: "Figma, Canva, GitHub" },
];

export const education = [
  {
    institution: "University of Manitoba",
    degree: "Bachelor of Science in Computer Science (Software Engineering)",
    period: "Jan 2019 – May 2024",
    location: "Winnipeg, MB, Canada",
  },
  {
    institution: "PSB Academy",
    degree: "Diploma in Infocomm Technology",
    period: "Jan 2017 – Jan 2018",
    location: "Singapore",
  },
];

export const languages = [
  { name: "Mandarin Chinese", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "Cantonese Chinese", level: "Intermediate" },
];
