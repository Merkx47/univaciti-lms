import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  BookOpen, Award, Trophy, Flame, Clock, ChevronRight,
  Play, Bell, LogOut, User, Settings, Sun, Moon, BarChart3,
  Rocket, Zap, Sunrise, Target, Star, BadgeCheck, Lock
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockUserStats, techLogos, allAchievements } from "@/lib/mock-data";
import { mockStore, useMockStore } from "@/lib/mock-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const THEME_PRIMARY = "#1E9AD6";

const getAchievementIcon = (iconName: string, className: string) => {
  const icons: Record<string, React.ReactNode> = {
    rocket: <Rocket className={className} />,
    flame: <Flame className={className} />,
    trophy: <Trophy className={className} />,
    award: <Award className={className} />,
    zap: <Zap className={className} />,
    moon: <Moon className={className} />,
    sunrise: <Sunrise className={className} />,
    target: <Target className={className} />,
    star: <Star className={className} />,
    badge: <BadgeCheck className={className} />,
  };
  return icons[iconName] || <Trophy className={className} />;
};

export default function StudentDashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const store = useMockStore();

  // Get enrollments from mock store for current user
  const enrollments = mockStore.getMyEnrollments();
  const stats = mockUserStats;

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
              <span className="text-xl font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {user?.firstName?.[0] || user?.username?.[0]?.toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                      <User className="w-4 h-4" /> Profile
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            Welcome back, {user?.firstName || user?.username}!
          </h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${THEME_PRIMARY}20` }}>
                <BookOpen className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
              </div>
            </div>
            <div className="text-2xl font-bold">{enrollments?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Courses Enrolled</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stats?.lessonsCompleted || 0}</div>
            <div className="text-sm text-muted-foreground">Lessons Completed</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stats?.currentStreak || 0}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stats?.totalPoints || 0}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Courses</h2>
            <Link href="/courses">
              <Button variant="outline" size="sm">Browse All</Button>
            </Link>
          </div>

          {enrollments && enrollments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-cyan-500 relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
                      {(item.course?.technologies as string[])?.slice(0, 4).map((tech: string) => (
                        techLogos[tech] && (
                          <img
                            key={tech}
                            src={techLogos[tech]}
                            alt={tech}
                            className="w-10 h-10 bg-white rounded-lg p-1.5"
                          />
                        )
                      ))}
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold mb-1 line-clamp-1 min-h-[1.5rem]">{item.course?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                      {item.course?.shortDescription || item.course?.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{item.course?.duration || 0}h</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>
                        {item.progress}% Complete
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.progress}%`,
                          backgroundColor: THEME_PRIMARY,
                        }}
                      />
                    </div>
                    <div className="mt-auto pt-4">
                      <Link href={`/course/${item.courseId}/lesson/${item.currentLessonId}`}>
                        <Button className="w-full text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                          Continue Learning
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${THEME_PRIMARY}20` }}>
                <BookOpen className="w-8 h-8" style={{ color: THEME_PRIMARY }} />
              </div>
              <h3 className="text-xl font-bold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't enrolled in any courses. Start your learning journey today!
              </p>
              <Link href="/certifications">
                <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                  Browse Courses
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Badges & Achievements */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Achievements</h2>
            <span className="text-sm text-muted-foreground">
              {stats?.earnedBadgeIds?.length || 0} of {allAchievements.length} unlocked
            </span>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <TooltipProvider>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                {allAchievements.map((achievement) => {
                  const isEarned = stats?.earnedBadgeIds?.includes(achievement.id);
                  return (
                    <Tooltip key={achievement.id}>
                      <TooltipTrigger asChild>
                        <div className="text-center cursor-pointer group">
                          <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center relative transition-transform group-hover:scale-110 ${
                            isEarned 
                              ? '' 
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`} style={isEarned ? { backgroundColor: THEME_PRIMARY } : {}}>
                            {isEarned ? (
                              getAchievementIcon(achievement.icon, "w-6 h-6 text-white")
                            ) : (
                              <>
                                {getAchievementIcon(achievement.icon, "w-6 h-6 text-slate-400 dark:text-slate-500 opacity-50")}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                </div>
                              </>
                            )}
                          </div>
                          <p className={`text-xs font-medium truncate ${
                            isEarned ? '' : 'text-muted-foreground'
                          }`}>{achievement.name}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px]">
                        <p className="font-medium text-white">{achievement.name}</p>
                        <p className="text-xs text-slate-300">{achievement.description}</p>
                        {!isEarned && (
                          <p className="text-xs mt-1 text-cyan-400">Unlock: {achievement.unlockCriteria}</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>
        </div>

      </main>
    </div>
  );
}
