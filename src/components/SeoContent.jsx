/**
 * SeoContent — hidden semantic HTML for search engines and AI crawlers.
 *
 * Visually hidden, but fully readable by screen readers and bots, so the
 * animated/JS-driven page above still has crawlable text behind it.
 */
export default function SeoContent() {
  return (
    <div className="sr-only" itemScope itemType="https://schema.org/Person">
      <h1 itemProp="name">
        Saubhagya Laxman Mamgain — Backend &amp; Full-Stack Engineer
      </h1>

      <p itemProp="description">
        Backend and full-stack engineer and final-year Electrical &amp; Electronics
        Engineering undergraduate at the Indian Institute of Technology, Patna.
        I build serverless APIs on AWS Lambda, Node.js and Express services,
        subscription and billing systems, and production web applications with
        Next.js, React and MongoDB. Codeforces Specialist with 600+ data
        structures and algorithms problems solved.
      </p>

      <p itemProp="jobTitle">Backend Software Developer</p>

      <section aria-label="Experience">
        <h2>Experience</h2>

        <article>
          <h3>Backend Software Developer Intern — Fourth Frontier Technologies</h3>
          <p>
            May 2026 to present, Bangalore, on-site. Engineered an end-to-end,
            multi-platform subscription management system handling cross-platform
            purchases via Shopify Webhooks and Android In-App APIs, with dynamic
            data-mapping logic and custom validation middleware classifying users
            across a four-tier subscription model, plus event-driven Slack API
            integrations and cron jobs for automated alerts. Refactored workout
            storage for 20 physiological metrics per timestamp, reducing database
            records from 20 to 1 per timestamp, and architected versioned
            serverless APIs on AWS Lambda with a two-tier fallback mechanism and
            Amazon S3 integration. Eliminated UI lag in acceleration graphs using
            the Largest Triangle Three Buckets algorithm, reducing 86,000 data
            points to 2,000 while preserving visual fidelity. Diagnosed production
            issues across AWS Lambda workflows with Postman, Jest, Supertest and
            CloudWatch log analysis.
          </p>
        </article>

        <article>
          <h3>Full Stack Developer Intern — Tradylytics</h3>
          <p>
            May 2025 to July 2025, remote, at an IIT Patna-backed startup.
            Integrated secure authentication with JWT and Google OAuth 2.0.
            Constructed REST APIs for CSV trade ingestion, manual trade management
            and broker integrations with request validation and MongoDB
            persistence on an MVC architecture. Reduced API response time by
            minimising redundant MongoDB queries, applying field projection and
            indexing frequently accessed collections in a Node.js and Express
            backend.
          </p>
        </article>
      </section>

      <section aria-label="Projects">
        <h2>Projects</h2>

        <article>
          <h3>AI Creator Copilot — Pocket FM Hackathon, 1st Runner-Up</h3>
          <p>
            An end-to-end AI Creator Studio that transforms a story idea into a
            complete audio episode through a human-in-the-loop workflow. Built
            with FastAPI, LangGraph, Google Gemini, React.js, Zustand and Tailwind
            CSS. Features an interrupt-driven LangGraph pipeline preserving
            workflow state across server restarts, and a parallel text-to-speech
            rendering pipeline with worker-based audio generation, API-key-aware
            rate limiting and content caching.
          </p>
        </article>

        <article>
          <h3>Streamify — Language Learning Platform</h3>
          <p>
            A full-stack language exchange platform supporting instant messaging
            and HD video communication, built with MongoDB, Express.js, React.js,
            Node.js, DaisyUI and Stream APIs. Includes friend connections,
            activity feeds, private messaging, video calling, screen sharing and
            cloud recording.
          </p>
        </article>

        <article>
          <h3>HOSCA — IIT Patna Cultural Club Portal</h3>
          <p>
            A production-ready web portal for the IIT Patna cultural club
            supporting 500+ users during major campus events and registrations.
            Built with TypeScript, Next.js and React.js, using server-side
            rendering and SEO optimisation, deployed on Vercel.
          </p>
        </article>
      </section>

      <section aria-label="Achievements">
        <h2>Achievements</h2>
        <ul>
          <li>1st Runner-Up with a 1.5 lakh cash prize at the Pocket FM AI Creator Hackathon, a 36-hour national hackathon.</li>
          <li>Flipkart GRID 8.0 Semi-Finalist out of 165,730 participants.</li>
          <li>Codeforces peak rating 1495, Specialist. CodeChef 3-star coder.</li>
          <li>Rank 112 in CodeChef Starters 172 among 35,000+ participants.</li>
          <li>Solved 600+ data structures and algorithms problems across LeetCode, Codeforces and GeeksforGeeks.</li>
          <li>Research Consultant at WorldQuant Brain, working on quantitative finance and alpha research.</li>
          <li>Top 0.4 percentile in JEE Mains among 1.2 million candidates; AIR 6102 in JEE Advanced among 190,000 candidates.</li>
        </ul>
      </section>

      <section aria-label="Technical skills">
        <h2>Technical Skills</h2>
        <p>
          Languages: C++, C, JavaScript, TypeScript, Python, SQL. Backend:
          Node.js, Express.js, FastAPI, REST APIs, JWT authentication, OAuth 2.0.
          Cloud: AWS Lambda, Amazon S3, Amazon RDS, DynamoDB, CloudWatch.
          Testing: Jest, Supertest, API testing with Postman. Databases: MongoDB,
          MySQL. Computer science fundamentals: data structures and algorithms,
          object-oriented programming, operating systems, computer networks,
          system design. Frontend: React.js, Next.js, Tailwind CSS, Redux
          Toolkit, DaisyUI. Tools: Git, GitHub, Bitbucket, Jira, Postman, Docker,
          Vercel, VS Code.
        </p>
      </section>

      <section aria-label="Education">
        <h2>Education</h2>
        <p>
          B.Tech in Electrical &amp; Electronics Engineering at the Indian
          Institute of Technology, Patna, 2023 to 2027, 77.5 percent.
          Intermediate from Doon International School, Dehradun, CBSE, 2023, 91.8
          percent. Matriculation from Summer Valley School, Dehradun, ICSE, 2021,
          97.6 percent.
        </p>
      </section>

      <section aria-label="Contact">
        <h2>Contact</h2>
        <p>
          Email <span itemProp="email">saubhagyamamgain@gmail.com</span>, phone
          +91-9410956469. Based in Bangalore, India, and open to backend and
          full-stack engineering roles.
        </p>
      </section>
    </div>
  );
}
