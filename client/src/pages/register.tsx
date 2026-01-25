import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Rocket, Target, Zap, ChevronLeft, ChevronRight, Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { SiApple, SiGoogle, SiFacebook, SiLinkedin } from "react-icons/si";

const THEME_PRIMARY = "#1E9AD6";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const slides = [
  {
    icon: Rocket,
    title: "Launch Your Tech Career",
    subtitle: "Start your journey today",
    description: "Join thousands of learners who have transformed their careers through our industry-recognized certification programs.",
    features: ["8-week intensive programmes", "Practical hands-on labs", "Real-world projects", "Industry mentorship"]
  },
  {
    icon: GraduationCap,
    title: "Earn Certifications",
    subtitle: "Get globally recognized credentials",
    description: "Our programmes prepare you for certifications from AWS, Microsoft Azure, Google Cloud, and Huawei Cloud.",
    features: ["Cloud practitioner", "Solutions architect", "Data analytics", "DevOps engineering"]
  },
  {
    icon: Target,
    title: "Focused Learning Paths",
    subtitle: "Tailored to your goals",
    description: "Choose from TESA for tech acceleration, STEM for young learners, or NEST for executives and entrepreneurs.",
    features: ["Personalized curriculum", "Flexible schedules", "Self-paced modules", "Live instructor support"]
  },
  {
    icon: Zap,
    title: "Fast-Track Success",
    subtitle: "Accelerate your growth",
    description: "Our proven methodology helps you gain practical skills quickly, with job placement support and internship opportunities.",
    features: ["Job placement assistance", "Internship programmes", "Portfolio building", "Interview preparation"]
  }
];

export default function Register() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
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
    console.log("Register submitted:", { fullName, email, password, agreeTerms });
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
            Create your account
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="text-subtitle">
            Join Univaciti and start your learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  data-testid="input-fullname"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  data-testid="input-confirm-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-confirm-password"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1"
                data-testid="checkbox-terms"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="font-medium hover:underline" style={{ color: THEME_PRIMARY }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium hover:underline" style={{ color: THEME_PRIMARY }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full text-white font-semibold"
              style={{ backgroundColor: THEME_PRIMARY }}
              data-testid="button-register"
            >
              <User className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">Or register using</p>
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

          <p className="mt-6 text-center text-muted-foreground" data-testid="text-login-prompt">
            Already have a Univaciti account?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: THEME_PRIMARY }} data-testid="link-login">
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-muted-foreground">
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
