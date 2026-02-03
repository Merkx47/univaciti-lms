import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
import { Eye, EyeOff, Mail, Lock, GraduationCap, Users, Globe, Award, ChevronLeft, ChevronRight, Sun, Moon, ArrowLeft, Loader2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.email, password: data.password }),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Welcome back!", description: "Successfully signed in." });
      if (data.user?.role === "admin" || data.user?.role === "instructor") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error: Error) => {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    },
  });

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
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    loginMutation.mutate({ email, password });
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              {loginMutation.isPending ? "Signing in..." : "Sign in to Dashboard"}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Sign in using</p>
            <div className="flex gap-3">
              <button
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                data-testid="button-sso-apple"
              >
                <AppleIcon className="w-6 h-6" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                data-testid="button-sso-google"
              >
                <GoogleIcon className="w-5 h-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#1877F2" }}
                data-testid="button-sso-facebook"
              >
                <FacebookIcon className="w-6 h-6 text-white" />
              </button>
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#0A66C2" }}
                data-testid="button-sso-linkedin"
              >
                <LinkedInIcon className="w-6 h-6 text-white" />
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
