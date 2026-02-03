import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import { MiniSkillLogo } from "@/components/tool-logo";

const THEME_PRIMARY = "#1E9AD6";
const THEME_LIGHT = "#3AAFE6";

// Cloud Engineering - Clean cloud with upload arrow
function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </svg>
  );
}

// Data Analytics - Clean bar chart with trend line
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-7H7v7zm4 0h2V7h-2v10zm4 0h2v-4h-2v4zm4 0h2V9h-2v8z"/>
    </svg>
  );
}

function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
      <path d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
      <path d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
      <path d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  );
}

// Quality Assurance - Selenium style testing icon
function QAIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  );
}

// React official atom logo - simplified
function ReactLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/>
    </svg>
  );
}

// Solutions Architecture - Network nodes diagram
function ArchitectureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="4" r="2.5"/>
      <circle cx="4" cy="12" r="2.5"/>
      <circle cx="20" cy="12" r="2.5"/>
      <circle cx="12" cy="20" r="2.5"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 6.5v2.5M12 15v2.5M6.5 12h2.5M15 12h2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

// AI & Machine Learning - Brain icon
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C5.5 5.5 4 7 4 9c0 1.5.5 2.5 1.5 3.5C5 13.5 4 15 4 17c0 2.5 2 4.5 4.5 4.5.5 0 1-.1 1.5-.2.5 1 1.5 1.7 2.5 1.7s2-.7 2.5-1.7c.5.1 1 .2 1.5.2 2.5 0 4.5-2 4.5-4.5 0-2-1-3.5-1.5-4.5 1-1 1.5-2 1.5-3.5 0-2-1.5-3.5-3-3.5-.5-2-2.5-3.5-5-3.5zm0 2c1.5 0 2.5 1 3 2h.5c1 0 1.5.5 1.5 1.5S16 9 15 9h-.5c-.5 1.5-1.5 2.5-2.5 2.5S10 10.5 9.5 9H9c-1 0-1.5-.5-1.5-1.5S8 6 9 6h.5c.5-1 1.5-2 2.5-2z"/>
    </svg>
  );
}

const specializations = [
  {
    id: "cloud-engineering",
    name: "Cloud Engineering",
    icon: CloudIcon,
    description: "Choose from the key Hyperscalers and achieve advanced skills in designing, deploying, and managing scalable cloud infrastructure across AWS, Azure, and GCP.",
    skills: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"]
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    icon: ChartIcon,
    description: "Master the art of collecting, analyzing, and visualizing data to drive business decisions. Learn SQL, Python, and modern BI tools for actionable insights.",
    skills: ["SQL", "Python", "Tableau", "Power BI", "Statistics"]
  },
  {
    id: "software-java",
    name: "Software Eng. - Java",
    icon: JavaIcon,
    description: "Build enterprise-grade applications with Java. Cover Spring Boot, microservices, APIs, and industry best practices for scalable backend systems.",
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "Maven"]
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    icon: QAIcon,
    description: "Ensure software excellence through comprehensive testing strategies. Learn manual and automated testing, CI/CD integration, and quality metrics.",
    skills: ["Selenium", "JUnit", "CI/CD", "Test Planning", "Automation"]
  },
  {
    id: "software-react",
    name: "Software Eng. - React",
    icon: ReactLogoIcon,
    description: "Create modern, responsive web applications with React. Master components, state management, hooks, and deployment to production environments.",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Testing"]
  },
  {
    id: "solutions-architecture",
    name: "Solutions Architecture",
    icon: ArchitectureIcon,
    description: "Design scalable, resilient, and cost-effective cloud solutions. Learn architectural patterns, security best practices, and system design principles.",
    skills: ["System Design", "Security", "Scalability", "Cost Optimization", "Documentation"]
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: RobotIcon,
    description: "Apply artificial intelligence and machine learning to solve real-world problems. Cover neural networks, NLP, computer vision, and model deployment.",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"]
  },
];

export default function CertificationsPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <img src={logoUrl} alt="Univaciti" className="h-9 w-9 rounded-full" />
                <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/register">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Register</Button>
              </Link>
              <Link href="/login">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Certifications
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-2">
            Validate your skillset with Univaciti certification courses.
          </p>
          <p className="text-sm" style={{ color: THEME_PRIMARY }}>
            Select a specialization to view the details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {specializations.map((spec, index) => (
            <Link key={index} href={`/certifications/${spec.id}`}>
              <div
                className="rounded-2xl p-5 h-80 cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-[#1E9AD6]/50 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight flex-1 pr-2">
                    {spec.name}
                  </h3>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#1E9AD6]/10">
                    <spec.icon className="w-6 h-6 text-[#1E9AD6]" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4 line-clamp-4">
                  {spec.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4 h-16 content-start overflow-hidden">
                  {spec.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium h-7">
                      <MiniSkillLogo name={skill} size="sm" />
                      {skill}
                    </span>
                  ))}
                  {spec.skills.length > 3 && (
                    <span className="text-xs px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium h-7">
                      +{spec.skills.length - 3}
                    </span>
                  )}
                </div>

                <div
                  className="w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold text-center transition-colors hover:opacity-90 mt-auto"
                  style={{ backgroundColor: THEME_PRIMARY }}
                >
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl bg-muted/30 border border-border">
          <h2 className="text-2xl font-light mb-4">Ready to get certified?</h2>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Start your learning journey today and earn industry-recognized certifications that employers value.
          </p>
          <Link href="/certify">
            <Button size="lg" style={{ backgroundColor: THEME_PRIMARY }}>
              Schedule an Exam
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
