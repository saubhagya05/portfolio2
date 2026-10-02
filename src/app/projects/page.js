import { Suspense } from "react";
import PageShell from "@/components/PageShell";
import ProjectsPage from "@/views/projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects",
  description:
    "Case studies from Saubhagya Laxman Mamgain — AI Creator Copilot (Pocket FM Hackathon 1st Runner-Up), Streamify, HOSCA, plus production backend work at Fourth Frontier Technologies and Tradylytics.",
  keywords: ["software engineering projects", "backend case studies", "LangGraph", "MERN stack", "Next.js portfolio"],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Saubhagya Laxman Mamgain",
    description: "Backend systems, full-stack products, and a hackathon build that placed second nationally.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectsPage />
      </Suspense>
      <Footer />
    </PageShell>
  );
}
