import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl } from "@/lib/siteUrl";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Resolved from NEXT_PUBLIC_SITE_URL, then the Vercel-provided domain.
const BASE = getSiteUrl();

const NAME = "Saubhagya Laxman Mamgain";
const SHORT = "Saubhagya";
const ROLE = "Backend & Full-Stack Engineer";
const EMAIL = "saubhagyamamgain@gmail.com";
const DESCRIPTION =
  "Backend and full-stack engineer, final-year EEE at IIT Patna. Serverless APIs on AWS Lambda, Node.js and Express services, Next.js products, and 600+ DSA problems solved.";

export const viewport = {
  themeColor: "#ff6b1a",
};

export const metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: `${NAME} — ${ROLE}`,
    template: `%s — ${SHORT} | ${ROLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Backend Developer", "Full Stack Developer", "Node.js Developer",
    "AWS Lambda", "Serverless APIs", "Next.js Developer", "React Developer",
    "IIT Patna", "Competitive Programmer", "Codeforces Specialist",
    "MongoDB", "Express.js", "Software Engineer India",
  ],
  authors: [{ name: NAME, url: BASE }],
  creator: NAME,
  publisher: NAME,

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE,
    siteName: `${NAME} — ${ROLE}`,
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: { canonical: BASE },
  category: "portfolio",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: NAME,
      givenName: "Saubhagya",
      familyName: "Mamgain",
      url: BASE,
      email: EMAIL,
      jobTitle: ROLE,
      description:
        "Backend and full-stack engineer building serverless APIs, subscription systems and production web apps. Final-year Electrical & Electronics Engineering undergraduate at IIT Patna.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Technology, Patna",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Node.js", "Express.js", "REST APIs", "AWS Lambda", "Amazon S3",
        "DynamoDB", "CloudWatch", "Serverless Architecture", "MongoDB", "MySQL",
        "JWT Authentication", "OAuth 2.0", "React", "Next.js", "TypeScript",
        "C++", "Data Structures and Algorithms", "System Design",
        "FastAPI", "LangGraph", "Jest", "Postman",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Backend Software Developer",
        occupationLocation: { "@type": "City", name: "Bangalore" },
        skills: "Node.js, AWS Lambda, Express.js, MongoDB, REST APIs, System Design",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: `${NAME} — ${ROLE}`,
      description: DESCRIPTION,
      publisher: { "@id": `${BASE}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#profilepage`,
      url: BASE,
      name: `${NAME} — Portfolio`,
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#person` },
      mainEntity: { "@id": `${BASE}/#person` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/projects` },
          { "@type": "ListItem", position: 3, name: "About", item: `${BASE}/about` },
          { "@type": "ListItem", position: 4, name: "Contact", item: `${BASE}/contact` },
        ],
      },
    },
    {
      "@type": "ItemList",
      name: "Projects",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "AI Creator Copilot",
          description:
            "End-to-end AI Creator Studio turning a story idea into a finished audio episode through an interrupt-driven LangGraph human-in-the-loop pipeline. 1st Runner-Up, Pocket FM AI Creator Hackathon.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Streamify",
          description:
            "Full-stack language exchange platform with instant messaging and HD video communication built on the MERN stack and Stream APIs.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "HOSCA",
          description:
            "Production Next.js web portal for the IIT Patna cultural club, serving 500+ users during major campus events.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Saubhagya Mamgain work on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Saubhagya is a backend and full-stack engineer. He builds REST and serverless APIs on AWS Lambda, Node.js and Express services, authentication with JWT and OAuth 2.0, and full-stack products with Next.js, React and MongoDB.",
          },
        },
        {
          "@type": "Question",
          name: "Where does Saubhagya study and work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "He is a final-year Electrical & Electronics Engineering undergraduate at the Indian Institute of Technology, Patna, and is currently a Backend Software Developer Intern at Fourth Frontier Technologies in Bangalore.",
          },
        },
        {
          "@type": "Question",
          name: "What is his competitive programming background?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "He is a Codeforces Specialist with a peak rating of 1495 and a 3-star CodeChef coder, ranked 112 in CodeChef Starters 172 among 35,000+ participants, with 600+ DSA problems solved across LeetCode, Codeforces and GeeksforGeeks.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Saubhagya?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Email ${EMAIL} or use the contact form on the site. He replies within a day.`,
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />

        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
      </head>
      <body>
        <TrackVisit />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
