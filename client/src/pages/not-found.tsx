import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Sun, Moon, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import worldMapImg from "@assets/world_map.png";

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

export default function NotFound() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative">
      <WorldMapWatermark />
      <Card className="w-full max-w-md mx-4 relative z-10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>

          <div className="flex items-center gap-2 mt-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
