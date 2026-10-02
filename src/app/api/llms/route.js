import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Machine-readable profile for AI crawlers and agents.
 * Mirrors public/llms.txt in JSON form.
 */
export async function GET() {
  const payload = {
    name: "Saubhagya Laxman Mamgain",
    role: "Backend & Full-Stack Engineer",
    website: BASE,
    email: "saubhagyamamgain@gmail.com",
    location: "Bangalore, India",
    summary:
      "Backend and full-stack engineer and final-year Electrical & Electronics Engineering undergraduate at the Indian Institute of Technology, Patna. Builds serverless APIs on AWS Lambda, Node.js and Express services, subscription and billing systems, and production web apps with Next.js, React and MongoDB.",

    education: [
      { degree: "B.Tech, Electrical & Electronics Engineering", institution: "Indian Institute of Technology, Patna", period: "2023-2027", score: "77.5%" },
      { degree: "Intermediate (CBSE)", institution: "Doon International School, Dehradun", period: "2023", score: "91.8%" },
      { degree: "Matriculation (ICSE)", institution: "Summer Valley School, Dehradun", period: "2021", score: "97.6%" },
    ],

    experience: [
      {
        company: "Fourth Frontier Technologies",
        role: "Backend Software Developer Intern",
        period: "May 2026 - Present",
        location: "Bangalore, on-site",
        highlights: [
          "Engineered an end-to-end, multi-platform subscription management system handling cross-platform purchases via Shopify Webhooks and Android In-App APIs, classifying users across a 4-tier model.",
          "Refactored workout storage for 20 physiological metrics per timestamp, reducing 20 database records to 1, and architected versioned serverless APIs on AWS Lambda with a 2-tier fallback and Amazon S3 integration.",
          "Eliminated UI lag in acceleration graphs with the Largest Triangle Three Buckets algorithm, reducing 86K data points to 2K while preserving visual fidelity.",
        ],
      },
      {
        company: "Tradylytics",
        role: "Full Stack Developer Intern",
        period: "May 2025 - July 2025",
        location: "Remote, IIT Patna-backed startup",
        highlights: [
          "Integrated secure authentication using JWT and Google OAuth 2.0.",
          "Constructed REST APIs for CSV trade ingestion, manual trade management and broker integrations on an MVC Node/Express backend.",
          "Reduced API response time through query reduction, field projection and indexing in MongoDB.",
        ],
      },
    ],

    projects: [
      {
        name: "AI Creator Copilot",
        award: "1st Runner-Up, Pocket FM AI Creator Hackathon",
        tech: ["FastAPI", "LangGraph", "Google Gemini", "React.js", "Zustand", "Tailwind CSS"],
        description:
          "End-to-end AI Creator Studio turning a story idea into a complete audio episode through an interrupt-driven, human-in-the-loop LangGraph pipeline.",
      },
      {
        name: "Streamify",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "DaisyUI", "Stream APIs"],
        description:
          "Full-stack language exchange platform with instant messaging, HD video communication, friend connections and activity feeds.",
      },
      {
        name: "HOSCA",
        tech: ["TypeScript", "Next.js", "React.js", "Vercel"],
        description:
          "Production web portal for the IIT Patna cultural club serving 500+ users during major campus events.",
      },
    ],

    achievements: [
      "1st Runner-Up with 1.5 lakh cash prize, Pocket FM AI Creator Hackathon",
      "Flipkart GRID 8.0 Semi-Finalist out of 1,65,730 participants",
      "Codeforces peak rating 1495 (Specialist); CodeChef 3-star",
      "Rank 112 in CodeChef Starters 172 among 35,000+ participants",
      "600+ DSA problems solved across LeetCode, Codeforces and GeeksforGeeks",
      "Research Consultant at WorldQuant Brain",
      "Top 0.4 percentile in JEE Mains; AIR 6102 in JEE Advanced",
    ],

    skills: {
      languages: ["C++", "C", "JavaScript", "TypeScript", "Python", "SQL"],
      backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT", "OAuth 2.0"],
      cloud: ["AWS Lambda", "Amazon S3", "Amazon RDS", "DynamoDB", "CloudWatch"],
      databases: ["MongoDB", "MySQL"],
      testing: ["Jest", "Supertest", "Postman"],
      frontend: ["React.js", "Next.js", "Tailwind CSS", "Redux Toolkit", "DaisyUI"],
      fundamentals: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Operating Systems",
        "Computer Networks",
        "System Design",
      ],
      tools: ["Git", "GitHub", "Bitbucket", "Jira", "Postman", "Docker", "Vercel", "VS Code"],
    },

    pages: {
      home: `${BASE}/`,
      projects: `${BASE}/projects`,
      about: `${BASE}/about`,
      contact: `${BASE}/contact`,
    },

    llms_txt: `${BASE}/llms.txt`,
    llms_full_txt: `${BASE}/llms-full.txt`,
  };

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
