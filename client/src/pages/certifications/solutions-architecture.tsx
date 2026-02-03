import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, ArrowLeft, Clock, BookOpen, Target, Award } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ToolsGrid } from "@/components/tool-logo";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
const THEME_PRIMARY = "#1E9AD6";

function WorldMapWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <img
        src={worldMapImg}
        alt=""
        className="w-full h-full object-cover opacity-[0.08] dark:opacity-[0.12] dark:invert"
        style={{ filter: 'grayscale(100%)' }}
      />
    </div>
  );
}

function BlueprintIcon({ className }: { className?: string }) {
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

const modules = [
  { name: "Architecture Fundamentals", hours: "20", description: "Core principles and patterns of system design" },
  { name: "System Design Patterns", hours: "25", description: "Common patterns for scalable architectures" },
  { name: "Cloud Architecture", hours: "30", description: "Designing cloud-native applications and services" },
  { name: "Scalability & Performance", hours: "20", description: "Building high-performance distributed systems" },
  { name: "Security Architecture", hours: "20", description: "Security-first design and compliance" },
  { name: "Cost Optimization", hours: "15", description: "Designing cost-effective cloud solutions" },
  { name: "Architecture Documentation", hours: "20", description: "Creating clear diagrams and technical docs" },
];

const skills = [
  { title: "System Design", description: "Design scalable, resilient, and maintainable systems." },
  { title: "Cloud Patterns", description: "Apply cloud-native architecture patterns and best practices." },
  { title: "High Availability", description: "Design for fault tolerance and disaster recovery." },
  { title: "Performance", description: "Architect for optimal performance and low latency." },
  { title: "Security", description: "Implement security-first architecture principles." },
  { title: "Cost Management", description: "Design cost-effective solutions with proper resource sizing." },
  { title: "Documentation", description: "Create clear architecture diagrams and technical documentation." },
];

const highlights = [
  { icon: Clock, label: "Duration", value: "150 Hours" },
  { icon: BookOpen, label: "Modules", value: "7 Modules" },
  { icon: Target, label: "Projects", value: "3 Projects" },
  { icon: Award, label: "Certificate", value: "Industry Recognized" },
];

const tools = ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "Confluence"];

export default function SolutionsArchitecturePage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-muted/30 relative">
      <WorldMapWatermark />
      <nav className="fixed top-0 left-0 right-0 z-50 frosted-nav border-b border-border/30">
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

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <div
            className="rounded-2xl p-8 sm:p-10 border border-white/20 shadow-xl"
            style={{ backgroundColor: THEME_PRIMARY }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                <BlueprintIcon className="w-12 h-12 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Solutions Architecture</h1>
                <p className="text-lg text-white/80">System Design Specialization</p>
              </div>
            </div>
            <p className="text-white/90 text-base leading-relaxed mb-8">
              Master the art of designing enterprise-grade solutions. This specialization
              covers system design patterns, cloud architecture, scalability, security,
              and cost optimization to prepare you for solutions architect roles.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <div className="text-white font-semibold">{item.value}</div>
                  <div className="text-white/60 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Modules */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
              Course Modules
            </h2>
            <div className="grid gap-3">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{module.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{module.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>{module.hours}</span>
                    <span className="text-xs text-muted-foreground ml-1">hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
              Skills You'll Learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-medium mb-1" style={{ color: THEME_PRIMARY }}>{skill.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Platforms Covered */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Tools & Platforms Covered</h2>
            <ToolsGrid tools={tools} />
          </div>

          {/* CTA */}
          <div className="text-center py-6">
            <Link href="/certify">
              <Button size="lg" className="px-8" style={{ backgroundColor: THEME_PRIMARY }}>
                Get Certified
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              Schedule your certification exam today
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
