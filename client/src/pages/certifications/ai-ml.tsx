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

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a1 1 0 011 1v2h3a3 3 0 013 3v2a1 1 0 01-2 0V8a1 1 0 00-1-1H8a1 1 0 00-1 1v2a1 1 0 01-2 0V8a3 3 0 013-3h3V3a1 1 0 011-1z"/>
      <rect x="5" y="10" width="14" height="10" rx="2"/>
      <circle cx="9" cy="14" r="1.5"/>
      <circle cx="15" cy="14" r="1.5"/>
      <path d="M9 18h6"/>
    </svg>
  );
}

const modules = [
  { name: "AI & ML Fundamentals", hours: "20", description: "Core concepts, algorithms, and mathematical foundations" },
  { name: "Python for ML", hours: "25", description: "NumPy, Pandas, and data manipulation for ML" },
  { name: "Supervised Learning", hours: "25", description: "Regression, classification, and ensemble methods" },
  { name: "Unsupervised Learning", hours: "20", description: "Clustering, dimensionality reduction, and anomaly detection" },
  { name: "Deep Learning", hours: "30", description: "Neural networks, CNNs, RNNs, and transformers" },
  { name: "Natural Language Processing", hours: "20", description: "Text processing and language models" },
  { name: "ML Operations", hours: "20", description: "Deploying and maintaining ML models in production" },
];

const skills = [
  { title: "ML Fundamentals", description: "Understand core concepts, algorithms, and mathematical foundations." },
  { title: "Python & Libraries", description: "Master NumPy, Pandas, Scikit-learn, and TensorFlow/PyTorch." },
  { title: "Supervised Learning", description: "Implement regression, classification, and ensemble methods." },
  { title: "Unsupervised Learning", description: "Apply clustering, dimensionality reduction, and anomaly detection." },
  { title: "Deep Learning", description: "Build neural networks, CNNs, RNNs, and transformers." },
  { title: "NLP", description: "Process text data and build language models." },
  { title: "MLOps", description: "Deploy and maintain ML models in production." },
];

const highlights = [
  { icon: Clock, label: "Duration", value: "160 Hours" },
  { icon: BookOpen, label: "Modules", value: "7 Modules" },
  { icon: Target, label: "Projects", value: "4 Projects" },
  { icon: Award, label: "Certificate", value: "Industry Recognized" },
];

const tools = ["Python", "TensorFlow", "PyTorch", "Jupyter", "Scikit-learn", "Hugging Face"];

export default function AiMlPage() {
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
                <RobotIcon className="w-12 h-12 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">AI & Machine Learning</h1>
                <p className="text-lg text-white/80">Artificial Intelligence Specialization</p>
              </div>
            </div>
            <p className="text-white/90 text-base leading-relaxed mb-8">
              Master artificial intelligence and machine learning from fundamentals to advanced applications.
              This specialization covers ML algorithms, deep learning, NLP, and MLOps to prepare you
              for AI/ML engineering roles.
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

          {/* Technologies Covered */}
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
