import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, Moon, ArrowLeft, Clock, BookOpen, Target, Award } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { AWSIcon, GCPIcon, HuaweiIcon } from "@/components/icons";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
import azureLogo from "@assets/image_1769038035704.png";

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

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </svg>
  );
}

const modules = [
  { name: "Cloud Fundamentals", hours: "10", description: "Core concepts and cloud computing models" },
  { name: "Cloud Services", hours: "40", description: "Compute, storage, networking, and managed services" },
  { name: "Cloud Solution Architecture", hours: "20", description: "Designing scalable and resilient systems" },
  { name: "Infrastructure As Code", hours: "10", description: "Terraform, CloudFormation, and automation" },
  { name: "DevOps & DevSecOps", hours: "10", description: "CI/CD pipelines and security integration" },
  { name: "Advanced Security", hours: "20", description: "Identity management and compliance" },
  { name: "Infrastructure Operations", hours: "40", description: "Monitoring, scaling, and maintenance" },
];

const skills = [
  { title: "Cloud Services", description: "Understanding compute, storage, networking, and managed services across cloud platforms." },
  { title: "Solution Architecture", description: "Designing scalable, resilient, and cost-effective cloud solutions." },
  { title: "Security", description: "Implementing identity management, access controls, encryption, and compliance." },
  { title: "Automation", description: "Using Infrastructure as Code tools to provision and manage cloud resources." },
  { title: "InOps", description: "Managing, monitoring, scaling, and maintaining reliable cloud infrastructure." },
  { title: "DevOps Practices", description: "Applying CI/CD pipelines, containerization, and collaboration workflows." },
];

const highlights = [
  { icon: Clock, label: "Duration", value: "150 Hours" },
  { icon: BookOpen, label: "Modules", value: "7 Modules" },
  { icon: Target, label: "Projects", value: "3 Projects" },
  { icon: Award, label: "Certificate", value: "Industry Recognized" },
];

export default function CloudEngineeringPage() {
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
                <CloudIcon className="w-12 h-12 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Cloud Engineering</h1>
                <p className="text-lg text-white/80">& Solutions Architecture</p>
              </div>
            </div>
            <p className="text-white/90 text-base leading-relaxed mb-8">
              The Cloud Engineering Specialization equips learners with practical skills to design,
              deploy, secure, and manage scalable cloud infrastructure. It focuses on hands-on
              experience with cloud services (AWS, Azure, Huawei, GCP), automation, DevOps practices,
              and real-world projects to prepare learners for in-demand cloud engineering roles.
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

          {/* Cloud Platforms */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Cloud Platforms Covered</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-muted/50 border border-border/50 hover:border-[#FF9900]/50 transition-colors">
                <AWSIcon className="w-10 h-10 text-[#FF9900]" />
                <span className="text-sm font-medium">AWS</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-muted/50 border border-border/50 hover:border-[#0078D4]/50 transition-colors">
                <img src={azureLogo} alt="Azure" className="w-10 h-10 object-contain" />
                <span className="text-sm font-medium">Microsoft Azure</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-muted/50 border border-border/50 hover:border-[#4285F4]/50 transition-colors">
                <GCPIcon className="w-8 h-8 text-[#4285F4]" />
                <span className="text-sm font-medium">Google Cloud</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-muted/50 border border-border/50 hover:border-[#CF0A2C]/50 transition-colors">
                <HuaweiIcon className="w-8 h-8 text-[#CF0A2C]" />
                <span className="text-sm font-medium">Huawei Cloud</span>
              </div>
            </div>
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
