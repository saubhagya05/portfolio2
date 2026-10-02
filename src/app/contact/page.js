import PageShell from "@/components/PageShell";
import ContactPage from "@/views/contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Saubhagya Laxman Mamgain about backend and full-stack engineering roles, internships, or collaboration. Email saubhagyamamgain@gmail.com.",
  keywords: ["hire backend developer", "contact software engineer", "full stack developer India"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Saubhagya Laxman Mamgain",
    description: "Open to backend and full-stack roles, internships, and interesting problems.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <ContactPage />
      <Footer />
    </PageShell>
  );
}
