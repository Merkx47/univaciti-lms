import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
import { Eye, EyeOff, Mail, Lock, GraduationCap, Users, Globe, Award, ChevronLeft, ChevronRight, Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { SiApple, SiGoogle, SiFacebook, SiLinkedin } from "react-icons/si";

const THEME_PRIMARY = "#1E9AD6";

function WorldMapWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <img
        src={worldMapImg}
        alt=""
        className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.15] dark:invert"
        style={{ filter: 'grayscale(100%)' }}
      />
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const slides = [
  {
    icon: GraduationCap,
    title: "World-Class Education",
    subtitle: "Learn from industry experts",
    description: "Access cutting-edge curricula designed by leading tech companies and certified instructors worldwide.",
    features: ["Cloud certifications", "Hands-on projects", "Industry mentorship", "Career support"]
  },
  {
    icon: Users,
    title: "Global Community",
    subtitle: "Connect with learners worldwide",
    description: "Join a vibrant community of tech professionals and learners from over 50 countries across Africa and beyond.",
    features: ["Peer collaboration", "Networking events", "Alumni network", "Study groups"]
  },
  {
    icon: Globe,
    title: "Multi-Cloud Training",
    subtitle: "Master all major platforms",
    description: "Get certified across AWS, Azure, GCP, and Huawei Cloud with our comprehensive multi-cloud training programs.",
    features: ["AWS certification", "Azure mastery", "GCP proficiency", "Huawei Cloud"]
  },
  {
    icon: Award,
    title: "Career Advancement",
    subtitle: "Accelerate your tech career",
    description: "Our graduates have landed positions at top companies including Google, Microsoft, Amazon, and leading African tech firms.",
    features: ["Job placement", "Internship programs", "Resume building", "Interview prep"]
  }
];

export default function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password, rememberMe });
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Back</span>
            </button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <Link href="/" className="inline-block mb-8">
            <img src={logoUrl} alt="Univaciti" className="h-12 rounded-full" data-testid="img-logo" />
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2 gradient-text" data-testid="text-welcome">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="text-subtitle">
            Sign in to access your learning dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  data-testid="checkbox-remember"
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm font-medium hover:underline" style={{ color: THEME_PRIMARY }} data-testid="link-forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: THEME_PRIMARY }}
              data-testid="button-sign-in"
            >
              <Lock className="w-4 h-4 mr-2" />
              Sign in to Dashboard
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Sign in using</p>
            <div className="flex gap-3">
              <button
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                data-testid="button-sso-apple"
              >
                <SiApple className="w-6 h-6" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                data-testid="button-sso-google"
              >
                <SiGoogle className="w-5 h-5" style={{ color: "#4285F4" }} />
              </button>
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#1877F2" }}
                data-testid="button-sso-facebook"
              >
                <SiFacebook className="w-6 h-6 text-white" />
              </button>
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#0A66C2" }}
                data-testid="button-sso-linkedin"
              >
                <SiLinkedin className="w-6 h-6 text-white" />
              </button>
              <button
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                data-testid="button-sso-x"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-muted-foreground" data-testid="text-register-prompt">
            Don't have a Univaciti account?{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: THEME_PRIMARY }} data-testid="link-register">
              Register now
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 Univaciti. All rights reserved.
          </p>
        </div>
      </div>

      <div 
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${THEME_PRIMARY} 0%, #0D4A6F 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src={worldMapImg}
            alt=""
            className="w-full h-full object-cover invert"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full p-12 relative z-10">
          <div 
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center glass float">
                <CurrentIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-3" data-testid="text-slide-title">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/80 text-center mb-6 text-lg" data-testid="text-slide-subtitle">
              {slides[currentSlide].subtitle}
            </p>

            <p className="text-white/70 text-center mb-8 leading-relaxed max-w-md mx-auto" data-testid="text-slide-description">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90 bg-white/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-white/30 text-white"
                data-testid="button-learn-more"
              >
                Learn more →
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors"
              data-testid="button-prev-slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                  data-testid={`button-slide-${index}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors"
              data-testid="button-next-slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
