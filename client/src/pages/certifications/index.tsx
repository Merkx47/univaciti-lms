import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import { MiniSkillLogo } from "@/components/tool-logo";

const THEME_PRIMARY = "#1E9AD6";
const THEME_LIGHT = "#3AAFE6";

// Certification Icons
function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 52C14 52 10 45 10 38C10 31 15 25 22 25C23 16 32 10 42 10C52 10 60 17 62 26C69 27 74 33 74 41C74 49 68 55 60 55H22"/>
      <path d="M32 40L40 48L52 36"/>
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="52" width="10" height="16"/>
      <rect x="27" y="38" width="10" height="30"/>
      <rect x="42" y="24" width="10" height="44"/>
      <rect x="57" y="12" width="10" height="56"/>
      <path d="M12 22L27 34L47 20L67 8"/>
      <circle cx="67" cy="8" r="3" fill="currentColor"/>
    </svg>
  );
}

function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30H50V60C50 65 45 70 35 70C25 70 20 65 20 60V30Z"/>
      <path d="M50 35H58C62 35 65 38 65 42C65 46 62 50 58 50H50"/>
      <path d="M28 18C28 18 30 22 35 22C40 22 40 18 40 18"/>
      <path d="M35 20C35 20 37 24 42 24C47 24 47 20 47 20"/>
    </svg>
  );
}

function QAIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="24"/>
      <path d="M28 40L36 48L52 32"/>
    </svg>
  );
}

function ReactLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="40" cy="40" rx="26" ry="10"/>
      <ellipse cx="40" cy="40" rx="26" ry="10" transform="rotate(60 40 40)"/>
      <ellipse cx="40" cy="40" rx="26" ry="10" transform="rotate(-60 40 40)"/>
      <circle cx="40" cy="40" r="5" fill="currentColor"/>
    </svg>
  );
}

function ArchitectureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="30" y="10" width="20" height="14" rx="2"/>
      <rect x="10" y="56" width="16" height="14" rx="2"/>
      <rect x="32" y="56" width="16" height="14" rx="2"/>
      <rect x="54" y="56" width="16" height="14" rx="2"/>
      <path d="M40 24V40"/>
      <path d="M18 56V46H62V56"/>
      <path d="M40 40V56"/>
    </svg>
  );
}

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="28" width="44" height="36" rx="4"/>
      <rect x="24" y="36" width="10" height="8" rx="2"/>
      <rect x="46" y="36" width="10" height="8" rx="2"/>
      <path d="M32 54H48"/>
      <path d="M40 12V28"/>
      <circle cx="40" cy="12" r="4"/>
      <path d="M12 42H18"/>
      <path d="M62 42H68"/>
      <path d="M28 64V70"/>
      <path d="M52 64V70"/>
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
                className="rounded-2xl p-5 flex flex-col min-h-80 cursor-pointer border-2 border-white/30 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-bold text-white leading-tight flex-1 pr-2">
                    {spec.name}
                  </h3>
                  <spec.icon className="w-10 h-10 text-white flex-shrink-0" />
                </div>

                <p className="text-sm text-white leading-relaxed flex-1 mb-3">
                  {spec.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {spec.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white/30 text-white font-medium">
                      <MiniSkillLogo name={skill} size="sm" />
                      {skill}
                    </span>
                  ))}
                  {spec.skills.length > 3 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/30 text-white font-medium">
                      +{spec.skills.length - 3}
                    </span>
                  )}
                </div>

                <div
                  className="self-end py-1.5 px-4 rounded-full text-white text-xs font-semibold border-2 border-white/80 hover:bg-white/20 transition-colors"
                  style={{ backgroundColor: THEME_LIGHT }}
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
