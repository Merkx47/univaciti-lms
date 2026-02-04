import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { adminLoginMutation, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Redirect if already logged in as admin
  if (user && (user.role === "admin" || user.role === "instructor")) {
    setLocation("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminLoginMutation.mutateAsync(formData);
    setLocation("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={logoUrl} alt="Univaciti" className="h-14 w-14 rounded-full" />
              <span className="text-3xl font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">
              Sign in to access the Learning Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username or Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-semibold text-lg"
              style={{ backgroundColor: THEME_PRIMARY }}
              disabled={adminLoginMutation.isPending}
            >
              {adminLoginMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In to Admin"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Only authorized administrators can access this portal.</p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials (Admin Portal):</p>
            <div className="space-y-1 text-xs">
              <p><span className="font-medium">Admin:</span> admin / admin123</p>
              <p><span className="font-medium">Instructor:</span> instructor / instructor123</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Student? <Link href="/login" className="font-medium hover:underline" style={{ color: THEME_PRIMARY }}>Login here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero section */}
      <div 
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-white relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${THEME_PRIMARY} 0%, #0D7AAE 100%)` 
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Learning Management System</h2>
          <p className="text-xl opacity-90 mb-8">
            Manage courses, students, and curriculum with our powerful admin tools.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">7+</div>
              <div className="text-sm opacity-80">Specializations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm opacity-80">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-80">Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-80">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
