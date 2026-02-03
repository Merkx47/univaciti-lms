import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import { MiniSkillLogo } from "@/components/tool-logo";

const THEME_PRIMARY = "#1E9AD6";
const THEME_LIGHT = "#3AAFE6";

// Certification Icons - AWS Cloud Icon
function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M38.089 77.466l-11.4 4.896 10.559 4.514 12.241-4.514-11.4-4.896zm-17.138 6.12l-.382 22.034 16.679 7.345V90.089l-16.297-6.503zm34.276 0l-15.073 5.739V110.9l15.073-6.121V83.586zm17.979-68.551L61.73 19.931l10.635 4.515 12.241-4.515-11.476-4.896zm-15.914 6.503v22.034l14.231 4.132.459-20.046-14.69-6.12zm31.828 1.224L75.66 28.5v21.652l13.466-5.738-.006-22.652zM19.21 46.013l-11.4 4.896 10.559 4.514 12.241-4.514-11.4-4.896zM2.072 52.133l-.382 22.034 16.679 7.345V58.636L2.072 52.133zm34.276 0L21.275 57.87v21.576l15.073-6.12V52.133zm56.679-14.949l-11.399 4.896 10.558 4.515 12.241-4.515-11.4-4.896zm-17.137 6.121l-.383 22.034 16.679 7.344V49.808l-16.296-6.503zm34.275 0l-15.072 5.738v21.576l15.072-6.12V43.305z"/>
    </svg>
  );
}

// Data Analytics - Python/Pandas style chart icon  
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M117.106 47.936h-20.073V22.345c0-6.9-5.6-12.5-12.5-12.5H43.467c-6.9 0-12.5 5.6-12.5 12.5v25.591H10.894c-3.314 0-6 2.686-6 6v51.719c0 3.314 2.686 6 6 6h106.212c3.314 0 6-2.686 6-6V53.936c0-3.314-2.686-6-6-6zM42.967 22.345c0-3.586 2.914-6.5 6.5-6.5h41.066c3.586 0 6.5 2.914 6.5 6.5v25.591H42.967V22.345zm68.139 83.31c0 .276-.224.5-.5.5H17.394a.501.501 0 0 1-.5-.5V60.436c0-.276.224-.5.5-.5h93.212c.276 0 .5.224.5.5v45.219z"/>
      <path d="M32.894 98.155h12v-25h-12zm20 0h12v-35h-12zm20 0h12v-20h-12zm20 0h12v-30h-12z"/>
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
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 118c-29.8 0-54-24.2-54-54S34.2 10 64 10s54 24.2 54 54-24.2 54-54 54z"/>
      <path d="M87.5 42.5L55 75 40.5 60.5 33 68l22 22 40-47z"/>
    </svg>
  );
}

// React official atom logo
function ReactLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M64 81.7c7.8 0 14.3-6.4 14.3-14.3S71.8 53.1 64 53.1 49.7 59.5 49.7 67.4 56.1 81.7 64 81.7z"/>
      <path d="M107.2 58.9c-1.1-.4-2.2-.8-3.4-1.1 .2-.8 .4-1.6 .6-2.3 3.3-14.3 1.1-25.8-6.2-30-7-4-18.5-.5-30.1 8.5-.8.6-1.6 1.3-2.4 2-.6-.6-1.2-1.1-1.9-1.6C52.3 25.4 40.6 21.3 33.4 25.5c-6.9 4-9 14.8-6.1 28.5.2.9.5 1.9.7 2.8-1.6.5-3.1.9-4.5 1.5-12.5 4.8-20.1 12.6-20.1 21.1 0 8.8 8.3 17.4 21.6 22.3 1.1.4 2.2.8 3.4 1.1-.2.8-.4 1.6-.6 2.3-3.3 14.3-1.1 25.8 6.2 30 1.7 1 3.6 1.4 5.7 1.4 5.6 0 12.7-3.2 20.1-9.1.8-.6 1.6-1.3 2.4-2 .6.6 1.2 1.1 1.9 1.6 7.5 6.2 14.8 9.4 20.5 9.4 2 0 3.9-.4 5.6-1.3 6.9-4 9-14.8 6.1-28.5-.2-.9-.5-1.9-.7-2.8 1.1-.3 2.2-.7 3.2-1.1 13.1-4.9 21.3-13.1 21.3-22C128.1 71.2 119.8 63.5 107.2 58.9zM96.9 32.8c4.6 2.6 6 11.3 3.4 22.6-.2.7-.4 1.5-.6 2.2-4.6-1-9.6-1.7-14.8-2.1-3-4.3-6.2-8.2-9.6-11.7.8-.7 1.5-1.3 2.3-1.9C86.4 35.4 93.5 30.9 96.9 32.8zM84.8 75.3c-1.7 3-3.5 5.9-5.4 8.7-3.4.3-6.9.4-10.4.4s-7-.1-10.4-.4c-1.9-2.8-3.7-5.7-5.4-8.7-1.7-3.1-3.3-6.2-4.7-9.4 1.4-3.2 3-6.3 4.7-9.4 1.7-3 3.5-5.9 5.4-8.7 3.4-.3 6.9-.4 10.4-.4s7 .1 10.4.4c1.9 2.8 3.7 5.7 5.4 8.7 1.7 3.1 3.3 6.2 4.7 9.4C88.1 69 86.5 72.2 84.8 75.3zM91 68.6c1.3 3.1 2.4 6.2 3.4 9.2-3 .7-6.2 1.2-9.5 1.7 1.1-1.8 2.2-3.7 3.2-5.5C89.2 72.2 90.1 70.4 91 68.6zM69 98.2c-2 2.1-4 4.1-6.1 5.9-2.1-1.8-4.1-3.8-6.1-5.9-2-2.2-3.9-4.4-5.6-6.6 3.8.3 7.7.4 11.7.4s7.9-.2 11.7-.4C72.9 93.8 71 96 69 98.2zM42.1 79.5c-3.3-.5-6.5-1-9.5-1.7 1-3 2.1-6 3.4-9.1.9 1.8 1.8 3.5 2.8 5.3C39.9 75.8 41 77.7 42.1 79.5zM36 65.9c-1.3-3.1-2.4-6.2-3.4-9.2 3-.7 6.2-1.2 9.5-1.7-1.1 1.8-2.2 3.7-3.2 5.5C37.8 62.3 36.9 64.1 36 65.9zM58 36.3c2-2.1 4-4.1 6.1-5.9 2.1 1.8 4.1 3.8 6.1 5.9 2 2.2 3.9 4.4 5.6 6.6-3.8-.3-7.7-.4-11.7-.4s-7.9.2-11.7.4C54.1 40.7 56 38.5 58 36.3zM84.9 55c3.3.5 6.5 1 9.5 1.7-1 3-2.1 6-3.4 9.1-.9-1.8-1.8-3.5-2.8-5.3C87.1 58.7 86 56.8 84.9 55zM30.1 32.6c3.5-2 10.8 2.7 19.9 9.4.6.5 1.2 1 1.8 1.5-3.4 3.5-6.6 7.4-9.6 11.7-5.2.4-10.2 1.1-14.8 2.1-.3-1-.5-1.9-.7-2.8C24.2 43 25.6 35.2 30.1 32.6zM26.4 97.7c-10.5-3.9-17-10-17-16.2 0-5.9 5.8-11.6 15.8-15.5 1.2-.5 2.6-.9 4-1.3 1.4 4.7 3.2 9.6 5.4 14.6-2.2 5-4 9.9-5.4 14.5C28.1 98.4 27.2 98 26.4 97.7zM49.8 121c-4.6-2.6-6-11.3-3.4-22.6.2-.7.4-1.5.6-2.2 4.6 1 9.6 1.7 14.8 2.1 3 4.3 6.2 8.2 9.6 11.7-.8.7-1.5 1.3-2.3 1.9C60.3 118.5 53.2 123 49.8 121zM97 101.8c2.6 11.2 1.2 19.7-3.4 22.4-4.7 2.7-13.4-2.4-23.2-10.8-.6-.5-1.2-1-1.8-1.5 3.4-3.5 6.6-7.4 9.6-11.7 5.2-.4 10.2-1.1 14.8-2.1C93.3 99.1 93.5 100 97 101.8zM100.6 97.6c-1.1.4-2.3.7-3.5 1.1-1.4-4.7-3.2-9.6-5.4-14.6 2.2-5 4-9.9 5.4-14.5 1.1.3 2.1.7 3.1 1.1 10.7 3.8 17.3 10.2 17.3 16.4C117.5 93 111.6 94.1 100.6 97.6z"/>
    </svg>
  );
}

// Solutions Architecture - AWS architecture diagram style
function ArchitectureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M64 8L8 40v48l56 32 56-32V40L64 8zm0 10.5L108.5 44 64 69.5 19.5 44 64 18.5zM16 50.5l44 25.1V113L16 87.9V50.5zm52 62.5V75.6l44-25.1V87.9L68 113z"/>
      <circle cx="64" cy="44" r="8"/>
      <circle cx="32" cy="72" r="6"/>
      <circle cx="96" cy="72" r="6"/>
      <circle cx="64" cy="96" r="6"/>
    </svg>
  );
}

// AI & Machine Learning - Brain/Neural Network icon
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8zm0 104c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
      <circle cx="44" cy="52" r="8"/>
      <circle cx="84" cy="52" r="8"/>
      <circle cx="64" cy="72" r="10"/>
      <path d="M44 52l20 20m20-20L64 72"/>
      <path d="M64 32v20m-24 8l12 12m36-12l-12 12"/>
      <circle cx="64" cy="32" r="6"/>
      <circle cx="40" cy="60" r="4"/>
      <circle cx="88" cy="60" r="4"/>
      <path d="M48 88c0 8.8 7.2 16 16 16s16-7.2 16-16"/>
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
