import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Link } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";
import {
  Sun,
  Moon,
  BookOpen,
  Sprout,
  GraduationCap,
  Star,
} from "lucide-react";
import { SiFacebook, SiLinkedin, SiInstagram } from "react-icons/si";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

// Univaciti theme colors - matching logo blue
const THEME_PRIMARY = "#1E9AD6";
const THEME_LIGHT = "#3AAFE6";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// Journey Animation Divider - Shows progression from learner to expert
function JourneyAnimationDivider({ className = "" }: { className?: string }) {
  const stages = [
    { icon: BookOpen, label: "Learn", color: "#60a5fa", bgGradient: "from-blue-400 to-blue-600" },
    { icon: Sprout, label: "Grow", color: "#34d399", bgGradient: "from-emerald-400 to-emerald-600" },
    { icon: GraduationCap, label: "Graduate", color: "#a78bfa", bgGradient: "from-violet-400 to-violet-600" },
    { icon: Star, label: "Expert", color: "#fbbf24", bgGradient: "from-amber-400 to-amber-600" },
  ];

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full py-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Journey Path */}
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 dark:bg-slate-700 -translate-y-1/2 z-0" />

          {/* Progress Line */}
          <motion.div
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 z-10"
            style={{ backgroundColor: THEME_PRIMARY }}
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Stage Icons */}
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            return (
              <motion.div
                key={index}
                className="relative z-20 flex flex-col items-center"
                animate={{
                  scale: index === activeStage ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg ${
                    index <= activeStage
                      ? `bg-gradient-to-br ${stage.bgGradient}`
                      : "bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  }`}
                  style={{
                    borderColor: index <= activeStage ? stage.color : undefined,
                    boxShadow: index === activeStage ? `0 0 30px ${stage.color}60, 0 4px 20px ${stage.color}40` : index <= activeStage ? `0 4px 15px ${stage.color}30` : "0 2px 10px rgba(0,0,0,0.1)"
                  }}
                  animate={{
                    y: index === activeStage ? -10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent 
                    className={`w-7 h-7 md:w-9 md:h-9 ${
                      index <= activeStage ? "text-white" : "text-gray-400 dark:text-slate-500"
                    }`}
                    strokeWidth={2.5}
                  />
                </motion.div>
                <motion.span
                  className={`mt-3 text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    index <= activeStage ? "text-foreground" : "text-foreground/40"
                  }`}
                  style={{
                    color: index === activeStage ? stage.color : undefined
                  }}
                >
                  {stage.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Person */}
        <div className="relative h-20 mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              className="absolute bottom-0"
              initial={{
                left: `${(activeStage / (stages.length - 1)) * 85 + 5}%`,
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                left: `${(activeStage / (stages.length - 1)) * 85 + 5}%`,
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.2 }
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              style={{ transform: "translateX(-50%)" }}
            >
            {/* Walking Person SVG */}
            <motion.svg
              viewBox="0 0 64 64"
              className="w-12 h-12 md:w-16 md:h-16"
              animate={{
                y: [0, -2, 0, -2, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              {/* Head */}
              <circle cx="32" cy="12" r="8" fill={THEME_PRIMARY} />
              {/* Body */}
              <path d="M32 20 L32 40" stroke={THEME_PRIMARY} strokeWidth="4" strokeLinecap="round" />
              {/* Left Arm - swings opposite to right leg */}
              <motion.line
                x1="32"
                y1="26"
                stroke={THEME_PRIMARY}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: activeStage === 3 ? [22, 22] : [20, 26, 20],
                  y2: activeStage === 3 ? [16, 16] : [32, 38, 32],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              {/* Right Arm - swings opposite to left leg */}
              <motion.line
                x1="32"
                y1="26"
                stroke={THEME_PRIMARY}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: activeStage === 3 ? [42, 42] : [44, 38, 44],
                  y2: activeStage === 3 ? [16, 16] : [38, 32, 38],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              {/* Left Leg - walking motion */}
              <motion.line
                x1="32"
                y1="40"
                stroke={THEME_PRIMARY}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [22, 28, 22],
                  y2: [54, 56, 54],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              {/* Right Leg - walking motion (opposite phase) */}
              <motion.line
                x1="32"
                y1="40"
                stroke={THEME_PRIMARY}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  x2: [42, 36, 42],
                  y2: [56, 54, 56],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              {/* Graduation Cap (appears at stage 2+) */}
              {activeStage >= 2 && (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M18 8 L32 2 L46 8 L32 14 Z" fill="#1e1e1e" />
                  <rect x="30" y="2" width="4" height="8" fill="#1e1e1e" />
                  <circle cx="34" cy="2" r="2" fill="#fbbf24" />
                </motion.g>
              )}
              {/* Star (appears at stage 3) */}
              {activeStage === 3 && (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    d="M50 8 L52 14 L58 14 L53 18 L55 24 L50 20 L45 24 L47 18 L42 14 L48 14 Z"
                    fill="#fbbf24"
                  />
                </motion.g>
              )}
            </motion.svg>
          </motion.div>
          </AnimatePresence>
        </div>

        {/* Stage Description */}
        <motion.p
          key={activeStage}
          className="text-center text-sm md:text-base text-foreground/70 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeStage === 0 && "Begin your journey with structured learning"}
          {activeStage === 1 && "Develop skills through hands-on practice"}
          {activeStage === 2 && "Earn your certification and validate expertise"}
          {activeStage === 3 && "Become an industry-recognized expert"}
        </motion.p>
      </div>
    </div>
  );
}

// Hero image URL
const HERO_IMAGE_URL = "https://techpoint.africa/wp-content/uploads/2025/02/blog_post_picture_01-1-scaled.jpg.webp";

function ThemeToggle({ testId }: { testId: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-testid={testId}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

// Programme Icons - Improved TESA icon (Rocket/Accelerator)
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 12C40 12 55 20 55 40C55 55 40 68 40 68C40 68 25 55 25 40C25 20 40 12 40 12Z"/>
      <circle cx="40" cy="38" r="6"/>
      <path d="M25 45L15 55L25 52"/>
      <path d="M55 45L65 55L55 52"/>
      <path d="M35 68L40 75L45 68"/>
    </svg>
  );
}

// STEM Icon - Pi/Math Symbol
function StemIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 25H60"/>
      <path d="M30 25V60"/>
      <path d="M50 25V45C50 55 55 60 60 60"/>
      <circle cx="25" cy="15" r="3" fill="currentColor"/>
      <circle cx="55" cy="15" r="3" fill="currentColor"/>
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="25" width="44" height="45" rx="2"/>
      <rect x="28" y="12" width="24" height="13"/>
      <rect x="25" y="32" width="6" height="6"/>
      <rect x="37" y="32" width="6" height="6"/>
      <rect x="49" y="32" width="6" height="6"/>
      <rect x="25" y="44" width="6" height="6"/>
      <rect x="37" y="44" width="6" height="6"/>
      <rect x="49" y="44" width="6" height="6"/>
      <rect x="35" y="56" width="10" height="14"/>
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function GraduationCapIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M32 8L4 24L32 40L60 24L32 8Z" strokeLinejoin="round"/>
      <path d="M16 32V48C16 48 24 56 32 56C40 56 48 48 48 48V32" strokeLinejoin="round"/>
      <path d="M32 40V56"/>
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M8 12C8 12 16 8 32 8C48 8 56 12 56 12V52C56 52 48 48 32 48C16 48 8 52 8 52V12Z"/>
      <path d="M32 8V48"/>
    </svg>
  );
}

function CertificateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="8" y="12" width="48" height="36" rx="2"/>
      <circle cx="32" cy="28" r="8"/>
      <path d="M28 36L26 52L32 48L38 52L36 36"/>
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="8" y="20" width="48" height="36" rx="3"/>
      <path d="M24 20V14C24 12 26 10 28 10H36C38 10 40 12 40 14V20"/>
      <path d="M8 36H56"/>
    </svg>
  );
}

function NavbarLogo() {
  return (
    <Link href="/" className="relative z-20 flex items-center gap-2 px-2 py-1" data-testid="logo-container">
      <img src={logoUrl} alt="Univaciti" className="h-9 w-9 rounded-full" data-testid="img-logo" />
      <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }} data-testid="text-brand-name">Univaciti</span>
    </Link>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Programmes", link: "/programmes" },
    { name: "Certification", link: "/certifications" },
    { name: "Recruitment", link: "/recruitment" },
    { name: "Certify", link: "/certify" },
    { name: "Community", link: "/community" },
  ];

  return (
    <ResizableNavbar className="top-2" data-testid="navbar">
      {/* Desktop Navigation */}
      <NavBody className="bg-background/80 dark:bg-background/80 border border-border/40">
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <ThemeToggle testId="button-theme-toggle" />
            <Link href="/register">
              <NavbarButton as="span" variant="secondary" className="dark:text-foreground" data-testid="button-register">
                Register
              </NavbarButton>
            </Link>
            <Link href="/login">
              <NavbarButton
                as="span"
                variant="brand"
                data-testid="button-sign-in"
              >
                Sign in
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-background/80 dark:bg-background/80 border border-border/40">
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggle testId="button-theme-toggle-mobile" />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-background dark:bg-background border border-border/40"
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-foreground/80 hover:text-foreground py-2 w-full"
                data-testid={`link-${item.name.toLowerCase()}-mobile`}
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-3 pt-4">
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton
                  as="span"
                  variant="secondary"
                  className="w-full dark:text-foreground border border-border"
                  data-testid="button-register-mobile"
                >
                  Register
                </NavbarButton>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton
                  as="span"
                  variant="brand"
                  className="w-full"
                  data-testid="button-sign-in-mobile"
                >
                  Sign in
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
  );
}

function HeroSection() {
  return (
    <section className="pt-20 relative h-[600px] sm:h-[650px]" data-testid="section-hero">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 top-20">
        <img
          src={HERO_IMAGE_URL}
          alt="Students learning tech skills"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-[calc(100%-80px)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          {/* Main Text Content */}
          <div className="max-w-2xl">
            {/* Large Headline - Udacity Style */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight" data-testid="text-hero-title">
              <span className="text-white">Learn. </span>
              <span className="text-white">Grow.</span>
              <br />
              <span className="text-white">Transform.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg" data-testid="text-hero-subtitle">
              Build in-demand skills to unlock your potential and drive outcomes for your career and business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/programmes/tesa">
                <Button
                  size="lg"
                  style={{ backgroundColor: THEME_PRIMARY }}
                  className="h-14 px-8 text-base font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  For Individuals
                </Button>
              </Link>
              <Link href="/programmes">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base font-semibold border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <BuildingIcon className="w-5 h-5 mr-2" />
                  For Businesses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreePillarsSection() {
  const pillars = [
    { 
      icon: BookIcon, 
      title: "Learning", 
      description: "Hop on any of the specialization courses and learn on your own terms.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    { 
      icon: CertificateIcon, 
      title: "Certification", 
      description: "Get certified to receive validation recruiters are looking for.",
      gradient: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50 dark:bg-violet-950/30"
    },
    { 
      icon: BriefcaseIcon, 
      title: "Recruitment", 
      description: "Get access to the pool of certified professionals.",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30"
    },
  ];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-background via-muted/30 to-background" data-testid="section-pillars">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">Your Path to Success</h2>
          <p className="text-foreground/60 max-w-xl mx-auto">Three pillars that power your tech career transformation</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className={`text-center fade-in-up stagger-${index + 1} group`} data-testid={`card-pillar-${index}`}>
              <div className={`relative w-28 h-28 rounded-3xl mx-auto mb-5 flex items-center justify-center ${pillar.bgColor} border border-border/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground" data-testid={`text-pillar-title-${index}`}>{pillar.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto" data-testid={`text-pillar-description-${index}`}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningProgrammeSection() {
  const programmes = [
    { 
      id: "tesa",
      name: "TESA", 
      icon: RocketIcon, 
      description: "Tech Skills Accelerator Programme. Intensive 8-week tech skills accelerator.",
      link: "/programmes/tesa"
    },
    { 
      id: "stem",
      name: "STEM", 
      icon: StemIcon, 
      description: "Science, Tech, Engineering and Maths courses for young people.",
      link: "/programmes/stem"
    },
    { 
      id: "nest",
      name: "NEST", 
      icon: BuildingIcon, 
      description: "Tailored for rapid but flexible curriculum for employees in key tech skills.",
      link: "/programmes/nest"
    },
  ];
  
  return (
    <section id="programmes" className="py-12 px-4 sm:px-6 lg:px-8 relative bg-muted dark:bg-slate-900" data-testid="section-programmes">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-light mb-3 gradient-text" data-testid="text-programmes-title">
            Learning Programme
          </h2>
          <p className="text-sm text-foreground/70 max-w-2xl mx-auto" data-testid="text-programmes-description">
            Choose from the pool of Univaciti programs and start learning when and how you choose to.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {programmes.map((programme, index) => (
            <Link key={index} href={programme.link}>
              <div
                className={`rounded-2xl p-5 flex flex-col h-52 cursor-pointer hover-lift shine-effect border border-white/20 fade-in-up stagger-${index + 1}`}
                style={{ backgroundColor: THEME_PRIMARY }}
                data-testid={`card-programme-${programme.id}`}
              >
                <h3 className="text-base font-semibold text-white mb-3" data-testid={`text-programme-name-${index}`}>
                  {programme.name}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed flex-1" data-testid={`text-programme-description-${index}`}>
                  {programme.description}
                </p>
                <div
                  className="self-end py-1.5 px-4 rounded-full text-white text-xs font-medium border border-white/50 mt-auto"
                  style={{ backgroundColor: THEME_LIGHT }}
                  data-testid={`button-programme-more-${index}`}
                >
                  More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


function Footer() {
  const footerLinks = {
    programmes: [
      { name: "TESA", href: "/programmes/tesa" },
      { name: "STEM", href: "/programmes/stem" },
      { name: "NEST", href: "/programmes/nest" },
    ],
    certifications: [
      { name: "Cloud Engineering", href: "/certifications/cloud-engineering" },
      { name: "Data Analytics", href: "/certifications/data-analytics" },
      { name: "Software Engineering", href: "/certifications/software-java" },
      { name: "View All", href: "/certifications" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Community", href: "/community" },
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
    ],
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" data-testid="img-footer-logo" />
              <span className="text-xl font-bold" style={{ color: THEME_PRIMARY }} data-testid="text-footer-brand">Univaciti</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Accelerating tech skills from novice to expertise. Get certified, get validated.
            </p>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: THEME_PRIMARY }}>Programmes</h4>
            <ul className="space-y-2">
              {footerLinks.programmes.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: THEME_PRIMARY }}>Certifications</h4>
            <ul className="space-y-2">
              {footerLinks.certifications.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: THEME_PRIMARY }}>Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: THEME_PRIMARY }}>Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors group">
            <SiFacebook className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] transition-colors group">
            <SiLinkedin className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-black transition-colors group">
            <XIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 transition-colors group">
            <SiInstagram className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500" data-testid="text-footer-copyright">
            © 2026 Univaciti. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Navbar />
      <HeroSection />

      {/* Three Pillars overview */}
      <ThreePillarsSection />

      {/* Learning Programme */}
      <LearningProgrammeSection />

      {/* Journey Animation */}
      <JourneyAnimationDivider />

      <Footer />
    </div>
  );
}
