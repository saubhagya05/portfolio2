import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description:
    "Saubhagya Laxman Mamgain — backend and full-stack engineer, final-year Electrical & Electronics Engineering at IIT Patna. AWS Lambda, Node.js, Express, MongoDB, Next.js. Codeforces Specialist with 600+ DSA problems solved.",
  keywords: [
    "backend engineer India", "Node.js developer", "AWS Lambda developer",
    "IIT Patna", "full stack developer", "competitive programmer",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Saubhagya Laxman Mamgain",
    description:
      "Backend and full-stack engineer building serverless APIs, subscription systems and production web apps. Final-year EEE at IIT Patna.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <AboutPage />
      <Footer />
    </PageShell>
  );
}
